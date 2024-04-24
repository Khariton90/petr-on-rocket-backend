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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
