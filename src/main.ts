import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const oracledb = require('oracledb');
oracledb.initOracleClient({
  libDir: process.env.ORACLE_HOME,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(5001);
}
bootstrap();
