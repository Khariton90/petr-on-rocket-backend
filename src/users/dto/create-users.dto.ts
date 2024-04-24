import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  @Expose()
  public nickname: string;
}
