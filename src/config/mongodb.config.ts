import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export function getMongoConnectionString({
  username,
  password,
  host,
  port,
  databaseName,
  authDatabase,
}): string {
  console.log(
    `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`,
  );
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function getMongoDbConfig(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: configService.get<string>('database.user'),
          password: configService.get<string>('database.password'),
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          databaseName: configService.get('database.name'),
          authDatabase: configService.get('database.authBase'),
        }),
      };
    },
    inject: [ConfigService],
  };
}
