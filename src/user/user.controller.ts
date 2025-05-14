import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePutUserDto } from './dtos/update-put-user.dto';
import { UpdatePatchUserDto } from './dtos/update-patch-user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() { name, password, email }: CreateUserDto) {
    return { name, password, email };
  }

  @Get()
  async findAll() {
    return { users: [] };
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return { user: {}, id };
  }

  @Put(':id')
  async update(@Body() { name, password, email }: UpdatePutUserDto, @Param('id', ParseIntPipe) id: number) {
    return {
      method: 'PUT',
      name,
      password,
      email,
      id,
    };
  }

  @Patch(':id')
  async updatePartial(@Body() { name, email, password }: UpdatePatchUserDto, @Param('id', ParseIntPipe) id: number) {
    return {
      method: 'Patch',
      name,
      email,
      password,
      id,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return {
      id
    };
  }
}
