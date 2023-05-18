import {
  IsDate,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({
    example: '64647d16a2b281d6cde326a2',
    required: true,
  })
  @IsMongoId()
  readonly id: string;

  @ApiProperty({ example: 'Raymond', required: true })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'example@example.com', required: true })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example:
      'The proper use of comments is to compensate for our failure to express ourself in code.',
    required: false,
  })
  readonly bio?: string;

  @ApiProperty({ example: 'Korea', required: false })
  readonly location?: string;

  @ApiProperty({ example: 'https://github.com', required: false })
  readonly homepage?: string;

  @ApiProperty({ example: `${new Date()}`, required: false })
  @IsDate()
  readonly updatedAt: Date;
}

export class UpsertUserRequest {
  @ApiProperty({ example: 'Raymond', required: true })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'example@example.com', required: true })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example:
      'The proper use of comments is to compensate for our failure to express ourself in code.',
    required: false,
  })
  readonly bio?: string;

  @ApiProperty({ example: 'Korea', required: false })
  readonly location?: string;

  @ApiProperty({ example: 'https://github.com', required: false })
  @IsUrl()
  @IsOptional()
  readonly homepage?: string;
}
