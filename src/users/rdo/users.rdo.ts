import { Expose, Transform } from 'class-transformer';

export class UsersRdo {
  @Expose({ name: 'id' })
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @Expose()
  public nickname: string;

  @Expose()
  public points: number;

  @Expose()
  public level: number;
}
