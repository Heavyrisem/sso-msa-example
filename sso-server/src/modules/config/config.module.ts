import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
        PORT: Joi.number().default(3000),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        MSA_PORT: Joi.string().required(),
        SSO_HOST: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        GOOGLE_OAUTH_CLIENT_ID: Joi.string().required(),
        GOOGLE_OAUTH_CLIENT_SECRET: Joi.string().required(),
        GITHUB_OAUTH_CLIENT_ID: Joi.string().required(),
        GITHUB_OAUTH_CLIENT_SECRET: Joi.string().required(),
        KAKAO_OAUTH_CLIENT_ID: Joi.string().required(),
        KAKAO_OAUTH_CLIENT_SECRET: Joi.string().required(),
      }),
    }),
  ],
})
export class ConfigurationModule {}
