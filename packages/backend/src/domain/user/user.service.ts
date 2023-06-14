import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { DomainService } from '@/domain/domain.service';
import { toUserDto, User, UserDocument } from '@/domain/user/user.schema';
import { CommonPageResult, CommonSort } from '@example/common';

@Injectable()
export class UserService extends DomainService<UserDocument> {
  constructor(
    @InjectModel(User.name)
    user: mongoose.Model<UserDocument>,
  ) {
    super(user);
  }

  async findAll(options: { offset: number; limit: number; sorts?: CommonSort[] }, search?: Record<string, string>): Promise<CommonPageResult> {
    const userPage = await super.findAll(options, search);
    return {
      ...userPage,
      items: userPage.items.map(user => {
        return toUserDto(user as UserDocument)
      })
    } ;
  }
}
