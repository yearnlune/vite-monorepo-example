import {
  IsAlphanumeric,
  IsMongoId,
  IsNumberString,
  IsOptional,
  IsUUID,
} from 'class-validator';

export type UUID36 = string;

export type Nullable<T> = T | null;

export class CommonSort {
  @IsAlphanumeric()
  property: string;

  direction: 'asc' | 'desc';
}

export class CommonPagination {
  @IsOptional()
  search?: string;

  @IsOptional()
  sorts?: CommonSort[];

  @IsNumberString()
  offset: number;

  @IsNumberString()
  limit: number;
}

export class UUID36Param {
  @IsUUID()
  id: UUID36;
}

export class ObjectIdParam {
  @IsMongoId()
  id: string;
}
