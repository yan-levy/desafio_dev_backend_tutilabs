import { Injectable } from '@nestjs/common';
import { CreateScriptDto } from './dto/create-script.dto';
import { UpdateScriptDto } from './dto/update-script.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomologScriptDto } from './dto/homolog-script.dto';

@Injectable()
export class ScriptService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateScriptDto) {
    const homolog = await this.prisma.homologation.create({
      data: {
        statusId: 1,
        commentary: 'need to change here', //TODO:
      },
    });

    return await this.prisma.script.create({
      data: {
        title: data.title,
        description: data.description,
        proposed_budget: +data.proposed_budget,
        file: 'a', //TODO:
        riskId: +data.risk,
        homologationId: homolog.id,
        userId: 1, //TODO:
      },
    });
  }

  async findAll(id: number) {
    return this.prisma.script.findMany({
      where: { Homologation: { statusId: id } },
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
          select: { Status: { select: { description: true } } },
        },
        User: { select: { name: true } },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.script.findFirst({ where: { id } });
  }

  async update(id: number, updateScriptDto: UpdateScriptDto) {
    return `This action updates a #${id} script`;
  }

  async remove(id: number) {
    return await this.prisma.script.delete({ where: { id } });
  }

  async homolog(data: HomologScriptDto) {
    return await this.prisma.homologation.update({
      where: { id: data.id },
      data: {
        commentary: data.commentary,
        statusId: data.homolog === false ? 3 : 2,
        userId: 1, //TODO: get the user informations from the req
      },
    });
  }
}
