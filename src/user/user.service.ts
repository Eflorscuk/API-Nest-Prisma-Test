import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

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
}