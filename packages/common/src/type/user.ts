import { IsDate, IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
import { UUID36 } from './common';

export class UserDTO {
  @IsUUID()
  readonly id: UUID36;

  @IsNotEmpty()
  readonly name: string;

  readonly bio?: string;

  readonly location?: string;

  @IsEmail()
  readonly email: string;

  readonly homepage?: string;

  @IsDate()
  readonly updatedAt: Date;
}

export class UpsertUserRequest {
  @IsNotEmpty()
  readonly name: string;

  readonly bio?: string;

  readonly location?: string;

  @IsEmail()
  readonly email: string;

  readonly homepage?: string;
}
