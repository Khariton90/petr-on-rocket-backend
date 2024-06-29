import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Message } from '@shared-types/shared-types';
import { Document } from 'mongoose';

@Schema({
  collection: 'messages',
  timestamps: true,
  versionKey: false,
})
export class MessagesModel extends Document implements Message {
  @Prop({
    required: true,
  })
  user: string;

  @Prop({
    required: true,
  })
  message: string;
}

export const MessagesSchema = SchemaFactory.createForClass(MessagesModel);
