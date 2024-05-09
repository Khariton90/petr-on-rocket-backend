import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageDto } from './dto/message.dto';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: any;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: MessageDto): void {
    this.server.emit('message', message);
  }
}
