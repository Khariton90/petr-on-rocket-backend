import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { MessageDto } from 'src/chat/dto/message.dto';
import { MessagesEntity } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  public async createMessage(dto: MessageDto) {
    const entity = new MessagesEntity(dto);
    return await this.messagesRepository.create(entity);
  }

  public async findAll() {
    return await this.messagesRepository.find();
  }
}
