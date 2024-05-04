import { UsersEntity } from './entities/users.entity';
import { User } from '@shared-types/shared-types';
import { InjectModel } from '@nestjs/mongoose';
import { UsersModel } from './users.model';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUsersDto } from './dto/create-users.dto';
import { CRUDRepository } from '@core/core';

@Injectable()
export class UsersRepository
  implements CRUDRepository<UsersEntity, string, User>
{
  constructor(
    @InjectModel(UsersModel.name)
    private readonly usersModel: Model<UsersModel>,
  ) {}

  public async create(item: UsersEntity): Promise<User> {
    const user = new this.usersModel(item);
    return user.save();
  }

  public async findTotalCount() {
    return this.usersModel.countDocuments().exec();
  }

  public async findById(id: string): Promise<User> {
    return this.usersModel.findById(id).exec();
  }

  public async findByNickname({
    nickname,
  }: CreateUsersDto): Promise<User | null> {
    return this.usersModel.findOne({ nickname }).exec();
  }

  public async find() {
    return this.usersModel
      .find({}, {}, { limit: 10 })
      .sort({ points: -1 })
      .limit(10)
      .exec();
  }

  public async update(id: string, item: UsersEntity): Promise<User> {
    return await this.usersModel
      .findByIdAndUpdate(id, item.toObject(), {
        new: true,
      })
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    this.usersModel.deleteOne({ id });
  }
}
