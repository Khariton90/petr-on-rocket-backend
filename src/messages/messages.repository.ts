import { CRUDRepository } from '@core/core';
import { MessagesEntity } from './entities/message.entity';
import { Message } from '@shared-types/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MessagesModel } from './messages.model';
import { Model } from 'mongoose';
import { MessageQuery } from 'src/chat/query/message.query';
import { DEFAULT_MESSAGE_LIMIT } from './messages.constants';

@Injectable()
export class MessagesRepository
  implements CRUDRepository<MessagesEntity, string, Message>
{
  constructor(
    @InjectModel(MessagesModel.name)
    private readonly messagesModel: Model<MessagesModel>,
  ) {}
  public create(item: MessagesEntity): Promise<Message> {
    const message = new this.messagesModel(item);
    return message.save();
  }

  public find(query: MessageQuery) {
    const skip = query.page ? query.page : 1;
    const limit = query.limit ? query.limit : DEFAULT_MESSAGE_LIMIT;
    return this.messagesModel.find().limit(limit).skip(skip).exec();
  }

  public findById(id: string): Promise<Message> {
    throw new Error('Method not implemented.');
  }

  public update(id: string, item: MessagesEntity): Promise<Message> {
    throw new Error('Method not implemented.');
  }

  public destroy(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
