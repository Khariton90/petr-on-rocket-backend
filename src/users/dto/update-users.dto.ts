import { Expose } from 'class-transformer';

export class UpdateUsersDto {
  @Expose()
  public id: string;

  @Expose()
  public nickname: string;
}
