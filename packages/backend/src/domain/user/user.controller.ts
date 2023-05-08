import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from '@/domain/user/user.service';
import {
  CommonPagination,
  ObjectIdParam,
  UpsertUserRequest,
} from '@example/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('api/users/:id')
  async findUser(@Param() param: ObjectIdParam) {
    return this.userService.findOne(param.id);
  }

  @Get('api/users')
  async findUsers(@Query() { search, sorts, offset, limit }: CommonPagination) {
    return this.userService.findAll(
      {
        sorts,
        offset,
        limit,
      },
      search ? { keyword: search } : undefined,
    );
  }

  @Post('api/users')
  @HttpCode(201)
  async createUser(@Body() user: UpsertUserRequest) {
    return this.userService.create(user);
  }

  @Patch('api/users/:id')
  async updateUser(
    @Param() param: ObjectIdParam,
    @Body() user: UpsertUserRequest,
  ) {
    return this.userService.update(param.id, user);
  }

  @Delete('api/users/:id')
  @HttpCode(204)
  async deleteUser(@Param() param: ObjectIdParam) {
    return this.userService.delete(param.id);
  }
}
