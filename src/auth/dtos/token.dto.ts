import { Expose } from 'class-transformer';

export class TokenDto {
  @Expose()
  id_token: string;
}
