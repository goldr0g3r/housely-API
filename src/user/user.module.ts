import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { dbConnection } from 'src/common/constants/mongo.constant';
import { UserSchema, UserSchemaObject } from './schema/user.schema';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: UserSchema.name,
          schema: UserSchemaObject,
          collection: 'users',
        },
      ],
      dbConnection.user,
    ),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
