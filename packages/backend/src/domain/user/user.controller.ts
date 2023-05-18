import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '@/domain/user/user.service';
import {
  CommonPagination,
  ObjectIdParam,
  UpsertUserRequest,
  UserDTO,
} from '@example/common';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Find a user by ID',
    description: 'Returns a user by its ID.',
  })
  @ApiResponse({ status: HttpStatus.OK, type: UserDTO })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid user ID',
  })
  @Get(':id')
  async findUser(@Param() param: ObjectIdParam) {
    return this.userService.findOne(param.id);
  }

  @ApiOperation({
    summary: 'Find all users',
    description: 'Returns a paginated list of users.',
  })
  @ApiResponse({ status: HttpStatus.OK, type: UserDTO, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid param' })
  @Get()
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

  @ApiOperation({
    summary: 'Create user',
    description: 'Returns a paginated list of users.',
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserDTO })
  @Post()
  @HttpCode(201)
  async createUser(@Body() user: UpsertUserRequest) {
    return this.userService.create(user);
  }

  @ApiOperation({
    summary: 'Update user',
    description: 'Updates the user with the given ID.',
  })
  @ApiResponse({ status: HttpStatus.OK, type: UserDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid param' })
  @Patch(':id')
  async updateUser(
    @Param() param: ObjectIdParam,
    @Body() user: UpsertUserRequest,
  ) {
    return this.userService.update(param.id, user);
  }

  @ApiOperation({
    summary: 'Delete user',
    description: 'Deletes the user with the given ID.',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No content' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid user ID',
  })
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param() param: ObjectIdParam) {
    return this.userService.delete(param.id);
  }
}
