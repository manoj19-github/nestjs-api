import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TasksModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    PassportModule
  ],
})
export class AppModule {}
