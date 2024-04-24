import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class LoginUsersDto {
  @IsString()
  @Expose()
  public nickname: string;

  @IsString()
  @Expose()
  public id: string;
}
