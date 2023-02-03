import { getProtoPath } from '@heavyrisem/sso-msa-example-proto';

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${process.env.MSA_PORT}`,
      protoPath: getProtoPath('auth/auth.proto'),
      package: 'auth',
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT);
}
bootstrap();
