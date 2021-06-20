import { IsEmail, IsNotEmpty } from 'class-validator';

export class PlayerDto {
  // Player phone number
  @IsNotEmpty()
  readonly phoneNumber: string;

  // Player email
  @IsEmail()
  readonly email: string;

  // Player name
  @IsNotEmpty()
  name: string;
}
