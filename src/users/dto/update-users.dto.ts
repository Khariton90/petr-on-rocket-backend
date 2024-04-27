import { Expose } from 'class-transformer';

export class UpdateUsersDto {
  @Expose()
  public id: string;

  @Expose()
  public nickname: string;

  @Expose()
  public points: number;

  @Expose()
  public level: number;
}
