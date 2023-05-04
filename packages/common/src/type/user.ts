import { UUID36 } from '@type/common';

export interface UserDTO {
  readonly id: UUID36;
  readonly name: string;
  readonly bio: string;
  readonly location: string;
  readonly email: string;
  readonly homepage: string;
  readonly updatedAt: Date;
}
