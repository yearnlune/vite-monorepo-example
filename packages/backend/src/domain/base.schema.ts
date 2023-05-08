import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BaseDocument = HydratedDocument<Base>;

@Schema()
export class Base {
  @Prop({
    type: Date,
    required: true,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: Date,
    required: true,
    default: Date.now,
  })
  updatedAt: Date;

  @Prop({ type: String })
  keyword: string;

  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  deleted: boolean;

  toDto: () => any;
}
