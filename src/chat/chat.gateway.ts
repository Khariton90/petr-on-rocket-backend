import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageDto } from './dto/message.dto';
import { MessagesService } from 'src/messages/messages.service';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer()
  server: any;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: MessageDto): void {
    this.messagesService.createMessage(message);
    this.server.emit('message', message);
  }
}
