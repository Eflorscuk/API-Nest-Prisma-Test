import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePutUserDto } from './dtos/update-put-user.dto';
import { UpdatePatchUserDto } from './dtos/update-patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create({ name, email, password }: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    { email, name, password, birthAt }: UpdatePutUserDto,
  ) {
    if (!(await this.show(id))) {
      throw new NotFoundException('User not found');
    }

    if (!birthAt) {
      birthAt = null;
    }

    return this.prisma.user.update({
      data: {
        email,
        name,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
      },
      where: {
        id,
      },
    });
  }

  async updatePartial(
    id: number,
    { email, name, password, birthAt }: UpdatePatchUserDto,
  ) {
    if (!(await this.show(id))) {
      throw new NotFoundException('User not found');
    }

    const data = {};

    if (birthAt) {
      data['birthAt'] = birthAt ? new Date(birthAt) : null;
    }

    if (email) {
      data['email'] = email;
    }

    if (name) {
      data['name'] = name;
    }

    if (password) {
      data['password'] = password;
    }

    return this.prisma.user.update({
      data: {
        name,
        email,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
      },
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    if (!(await this.show(id))) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
