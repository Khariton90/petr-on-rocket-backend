import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  name: process.env.MONGO_DB,
  host: process.env.MONGO_HOST,
  port: parseInt(process.env.MONGO_PORT, 10),
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  authBase: process.env.MONGO_DB_BASE,
}));
