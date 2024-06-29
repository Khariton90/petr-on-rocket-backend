import { CRUDRepository } from '@core/core';
import { MessagesEntity } from './entities/message.entity';
import { Message } from '@shared-types/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MessagesModel } from './messages.model';
import { Model } from 'mongoose';

const MESSAGES_LIMIT = 4;

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

  public find() {
    return this.messagesModel.find().limit(MESSAGES_LIMIT);
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
