import { Expose } from 'class-transformer';

export class UserLevelDto {
  @Expose()
  public id: string;

  @Expose()
  public points: number;

  @Expose()
  public level: number;
}
