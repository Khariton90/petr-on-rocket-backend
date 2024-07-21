import { Expose, Transform } from 'class-transformer';

export class MessageRdo {
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  id: string;

  @Expose()
  user: string;

  @Expose()
  message: string;

  @Expose()
  createdAt: string;
}
