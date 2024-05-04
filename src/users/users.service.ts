import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersEntity } from './entities/users.entity';
import { LoginUsersDto } from './dto/login-users.dto';
import { isValidObjectId } from 'mongoose';
import { UpdateUsersDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(dto: CreateUsersDto) {
    await this.findByNickname(dto);

    const entity = new UsersEntity({
      nickname: dto.nickname,
      points: 0,
      level: 1,
    });

    const newUser = await this.usersRepository.create(entity);
    return newUser;
  }

  public async findById(id: string) {
    const existUser = await this.usersRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Users on this ID ${id} not found`,
      });
    }

    return existUser;
  }

  public async findByNickname(dto: CreateUsersDto) {
    const existUser = await this.usersRepository.findByNickname(dto);

    if (existUser) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: `The user under the nickname ${existUser.nickname} already exists`,
      });
    }
  }

  public async login(dto: LoginUsersDto) {
    const isValid = isValidObjectId(dto.id);

    if (!isValid) {
      throw new ForbiddenException({
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Incorrect ID',
      });
    }

    const existUser = await this.findById(dto.id);
    if (!existUser) {
      throw new ForbiddenException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `User with ID ${dto.id} was not found`,
      });
    }

    if (existUser.nickname !== dto.nickname) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: `Incorrect nickname`,
      });
    }

    return existUser;
  }

  public async find() {
    return await this.usersRepository.find();
  }

  public async updateUser(dto: UpdateUsersDto) {
    const entity = new UsersEntity(dto);
    const existUser = await this.usersRepository.findById(dto.id);

    if (!existUser) {
      throw new ForbiddenException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `User with ID ${dto.id} was not found`,
      });
    }
    const updatedUser = await this.usersRepository.update(dto.id, entity);
    return updatedUser;
  }

  public async getTotalCount() {
    return this.usersRepository.findTotalCount();
  }
}
