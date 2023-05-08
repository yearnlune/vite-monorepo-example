import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { DomainService } from '@/domain/domain.service';
import { User, UserDocument } from '@/domain/user/user.schema';

@Injectable()
export class UserService extends DomainService<UserDocument> {
  constructor(
    @InjectModel(User.name)
    user: mongoose.Model<UserDocument>,
  ) {
    super(user);
  }
}
