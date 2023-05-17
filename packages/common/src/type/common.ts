import {
  IsAlphanumeric,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export type UUID36 = string;

export type Nullable<T> = T | null;

export class CommonSort {
  @ApiProperty({ description: 'property name' })
  @IsAlphanumeric()
  property: string;

  @ApiProperty({ description: 'sort direction' })
  direction: 'asc' | 'desc';
}

export class CommonPagination {
  @IsOptional()
  search?: string;

  @IsOptional()
  sorts?: CommonSort[];

  @Type(() => Number)
  @IsNumber()
  offset: number;

  @Type(() => Number)
  @IsNumber()
  limit: number;
}

export class UUID36Param {
  @IsUUID()
  id: UUID36;
}

export class ObjectIdParam {
  @ApiProperty({ description: 'Object ID' })
  @IsMongoId()
  id: string;
}
