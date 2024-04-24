import { UsersEntity } from './entities/users.entity';
import { User } from '@shared-types/shared-types';
import { InjectModel } from '@nestjs/mongoose';
import { UsersModel } from './users.model';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUsersDto } from './dto/create-users.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(UsersModel.name)
    private readonly usersModel: Model<UsersModel>,
  ) {}

  public async create(item: UsersEntity): Promise<User> {
    const user = new this.usersModel(item);
    return user.save();
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
    const count = await this.usersModel.countDocuments().exec();
    console.log(count);
    return this.usersModel
      .find({}, {}, { limit: 10 })
      .sort({ points: -1 })
      .exec();
  }
}
