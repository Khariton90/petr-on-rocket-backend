import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesModel, MessagesSchema } from './messages.model';
import { MessagesController } from './messages.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MessagesModel.name, schema: MessagesSchema },
    ]),
  ],
  providers: [MessagesService, MessagesRepository],
  exports: [MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
