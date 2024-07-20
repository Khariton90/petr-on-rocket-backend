import { Expose } from 'class-transformer';

export class MessageRdo {
  @Expose()
  user: string;

  @Expose()
  message: string;

  @Expose()
  createdAt: string;
}
