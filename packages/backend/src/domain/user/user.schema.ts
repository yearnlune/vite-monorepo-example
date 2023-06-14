import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from '@/domain/base.schema';
import { UserDTO } from '@example/common';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Base {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  bio?: string;

  @Prop({ type: String })
  location?: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  homepage?: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toDto = function (this: UserDocument): UserDTO {
  return {
    id: this._id.toString(),
    name: this.name,
    email: this.email,
    updatedAt: this.updatedAt,
    bio: this.bio,
    location: this.location,
    homepage: this.homepage,
  };
};

export function toUserDto(user: UserDocument): UserDTO {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    updatedAt: user.updatedAt,
    bio: user.bio,
    location: user.location,
    homepage: user.homepage,
  }
}

export { UserSchema };
