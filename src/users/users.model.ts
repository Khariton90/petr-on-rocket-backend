import { User } from '@shared-types/shared-types';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'users',
  timestamps: true,
  versionKey: false,
})
export class UsersModel extends Document implements User {
  @Prop()
  public nickname: string;

  @Prop()
  public points: number;

  @Prop()
  public level: number;
}

export const UsersSchema = SchemaFactory.createForClass(UsersModel);
