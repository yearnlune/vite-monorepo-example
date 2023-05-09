import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserSchema } from '@/domain/user/user.schema';
import { UserService } from '@/domain/user/user.service';
import { UpsertUserRequest } from '@example/common';
import {
  MockMongoModule,
  closeMongoMemoryServer,
} from '@test/mock.mongo.module';

describe('UserService', () => {
  let userService: UserService;
  let mockUser: any;
  let deletedUser: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MockMongoModule,
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
      ],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
    mockUser = await userService.create({
      name: 'mock',
      email: 'mock@email.com',
    });
    deletedUser = await userService.create({
      name: 'delete',
      email: 'delete@email.com',
    });
  });

  afterAll(() => {
    closeMongoMemoryServer();
  });

  it('find', async () => {
    /* given */
    const userId = mockUser.id;

    /* when */
    const user = await userService.findOne(userId);

    /* then */
    expect(user.id).toBe(mockUser.id);
  });

  it('findAll', async () => {
    /* when */
    const users = await userService.findAll({ offset: 0, limit: 10 });

    /* then */
    expect(users.length).toBeGreaterThanOrEqual(1);
  });

  it('create', async () => {
    /* given */
    const userReq: UpsertUserRequest = {
      name: 'user#1',
      email: 'user#1@email.com',
    };

    /* when */
    const user = await userService.create(userReq);

    /* then */
    expect(user).toMatchObject({ ...userReq });
    expect(user.id).not.toBeUndefined();
  });

  it('update', async () => {
    /* given */
    const userId = mockUser.id;
    const update: UpsertUserRequest = {
      name: 'updatedName',
      email: 'updated-email@email.com',
      bio: 'newBio',
    };

    /* when */
    const user = await userService.update(userId, update);

    /* then */
    expect(user).toMatchObject({ ...update });
  });

  it('delete', async () => {
    /* given */
    const userId = deletedUser.id;

    /* when */
    const user = await userService.delete(userId);

    /* then */
    expect(user.modifiedCount).toBe(1);
  });
});
