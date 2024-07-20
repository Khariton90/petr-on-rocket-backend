import { Controller, Get, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageQuery } from 'src/chat/query/message.query';
import { fillObject } from '@core/core';
import { MessageRdo } from 'src/chat/rdo/message.rdo';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  public async findMessages(@Query() query: MessageQuery) {
    return fillObject(MessageRdo, this.messagesService.findAll(query));
  }
}
