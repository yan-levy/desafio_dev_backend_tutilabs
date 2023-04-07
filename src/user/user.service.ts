import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const alreadyExists = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (alreadyExists)
      throw new HttpException(
        'This email is already registered',
        HttpStatus.BAD_REQUEST,
      );

    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: data.password,
        name: createUserDto.name,
        roleId: createUserDto.role,
      },
    });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      where: {
        OR: [{ roleId: 1 }, { roleId: 2 }],
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        Role: {
          select: { description: true },
        },
      },
      orderBy: {
        roleId: 'asc',
      },
    });
  }

  async delete(id: number) {
    //TODO: Obs: o sistema não poderá excluir caso já exista um roteiro aprovado pela produtora e vinculado a um roteirista.
    const cannotBeDeleted = await this.prisma.script.findFirst({
      where: {
        AND: [{ userId: id }, { Homologation: { statusId: { not: 2 } } }],
      },
    });

    if (cannotBeDeleted) {
      throw new HttpException(
        `This user have active script(s), therefore, he cannot be deleted`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findFirst({
      where: { id },
      include: {
        Role: {
          select: {
            description: true,
          },
        },
      },
    });
  }
}
