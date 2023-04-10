import { UnauthorizedError } from './../auth/errors/unauthorized.error';
import { MailService } from 'src/mail/mail.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateScriptDto } from './dto/create-script.dto';
import { UpdateScriptDto } from './dto/update-script.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomologScriptDto } from './dto/homolog-script.dto';
import { SimulateScriptDto } from './dto/simulate-script.dto';

@Injectable()
export class ScriptService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async create(data: CreateScriptDto, file, req) {
    const homolog = await this.prisma.homologation.create({
      data: {
        statusId: 1,
        commentary: '', //TODO: How can i set null here? Do I really need to change the schema to option field?
      },
    });
    console.log(file);

    return await this.prisma.script.create({
      data: {
        title: data.title,
        description: data.description,
        proposed_budget: +data.proposed_budget,
        file: file.filename,
        riskId: +data.risk,
        homologationId: homolog.id,
        userId: req.user.id,
      },
    });
  }

  async findAll(req) {
    // await this.mailService.sendUserConfirmation(); //TODO:
    return await this.prisma.script.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        Homologation: true,
        Risk: true,
        User: true,
      },
    });
  }

  async findAllByStatus(id: number, req) {
    return this.prisma.script.findMany({
      // where: { Homologation: { statusId: id } },
      where: {
        OR: [
          {
            Homologation: { AND: [{ statusId: id }, { userId: req.user.id }] },
          },
          {
            AND: [{ userId: req.user.id }, { Homologation: { statusId: id } }],
          },
        ],
      },
      select: {
        id: true,
        title: true,
        description: true,
        proposed_budget: true,
        file: true,
        Risk: {
          select: { description: true, percent: true },
        },
        Homologation: {
          include: {
            Status: true,
            User: true,
          },
        },
        User: { select: { name: true } },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.script.findFirst({ where: { id } });
  }

  async update(data: UpdateScriptDto, req, file) {
    //TODO:
    return await this.prisma.script.findFirst({
      where: {
        AND: [
          { id: +data.id },
          { userId: req.user.id },
          // {
          //   Homologation: {
          //     statusId: { not: 2 },
          //   },
          // },
        ],
      },
    });

    // console.log(isOwnerAndIsNotHomologated);

    // if (!isOwnerAndIsNotHomologated)
    //   throw new HttpException(
    //     `This Script is already homologated or you're not the owner. You can't edit it!`,
    //     HttpStatus.UNAUTHORIZED,
    //   );

    return await this.prisma.script
      .update({
        where: {
          id: +data.id,
        },
        data: {
          title: data.title,
          description: data.description,
          proposed_budget: +data.proposed_budget,
          file: file.filename,
          riskId: +data.risk,
          userId: req.user.id,
        },
      })
      .then(async (data) => {
        return await this.prisma.homologation.update({
          where: {
            id: data.id,
          },
          data: {
            statusId: 1,
          },
        });
      });
  }

  async delete(id: number, req) {
    //TODO: the scriptwriter can delete only if the script belongs to him
    const isOwner = await this.prisma.script.findFirst({
      where: { AND: [{ id }, { userId: req.user.id }] },
    });
    if (!isOwner)
      throw new HttpException(
        `This Script doesn't belong to the current user!`,
        HttpStatus.UNAUTHORIZED,
      );
    return await this.prisma.script.delete({
      where: {
        id,
      },
    });
  }

  async homolog(data: HomologScriptDto, req) {
    return await this.prisma.homologation.update({
      where: { id: data.id },
      data: {
        commentary: data.commentary,
        statusId: data.homolog === false ? 3 : 2,
        userId: req.user.id,
      },
    });
  }

  async simulate(data: SimulateScriptDto) {
    const risk = await this.prisma.script
      .findFirst({
        where: { id: data.id },
        select: { Risk: { select: { percent: true, description: true } } },
      })
      .then((risk) => {
        return {
          percent: risk.Risk.percent,
          description: risk.Risk.description,
        };
      });

    const result = {
      risk: risk.description,
      percent: `${risk.percent}%`,
      investment: data.quantity,
      simulation: data.quantity + (risk.percent / 100) * data.quantity,
    };

    return result;
  }
}
