import { Expose } from 'class-transformer';

export class UsersListRdo {
  @Expose()
  public nickname: string;

  @Expose()
  public points: number;

  @Expose()
  public level: number;
}
