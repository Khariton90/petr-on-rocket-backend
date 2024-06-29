import { Message } from '@shared-types/shared-types';

export class MessagesEntity implements Message {
  public user: string;
  public message: string;
  public _id?: string;

  constructor(message: Message) {
    this.fillEntity(message);
  }

  public fillEntity(message: Message) {
    this._id = message._id;
    this.message = message.message;
    this.user = message.user;
  }

  public toObject() {
    return { ...this };
  }
}
