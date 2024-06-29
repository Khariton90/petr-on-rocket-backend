import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ENV_PATH } from './app.contants';
import { getMongoDbConfig } from './config/mongodb.config';
import mongoDbOptions from './config/db.config';
import envSchema from './env.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat/chat.gateway';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_PATH,
      load: [mongoDbOptions],
      validationSchema: envSchema,
    }),
    UsersModule,
    MongooseModule.forRootAsync(getMongoDbConfig()),
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
