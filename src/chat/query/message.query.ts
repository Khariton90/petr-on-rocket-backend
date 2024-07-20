import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { DEFAULT_MESSAGE_LIMIT } from 'src/messages/messages.constants';

export class MessageQuery {
  @Transform(({ value }) => Number(value) || DEFAULT_MESSAGE_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_MESSAGE_LIMIT;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public page: number;
}
