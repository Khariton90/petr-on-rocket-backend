import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageDto } from './dto/message.dto';
import { MessagesService } from 'src/messages/messages.service';
import { fillObject } from '@core/core';
import { MessageRdo } from './rdo/message.rdo';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer()
  server: any;

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: MessageDto): Promise<void> {
    const newMessage = fillObject(
      MessageRdo,
      await this.messagesService.createMessage(message),
    );

    this.server.emit('message', newMessage);
  }
}
