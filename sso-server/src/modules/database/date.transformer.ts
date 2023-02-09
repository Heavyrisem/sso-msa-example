import { ValueTransformer } from 'typeorm';

import { Logger } from '@nestjs/common';

export class DateTransformer implements ValueTransformer {
  logger = new Logger(DateTransformer.name);

  to(entityValue?: number) {
    this.logger.debug(`to ${entityValue}`);

    if (entityValue) return new Date(entityValue);
    else return entityValue;
  }
  from(databaseValue?: Date) {
    this.logger.debug(`from ${databaseValue}`);

    if (databaseValue) {
      const date = new Date(databaseValue);
      this.logger.debug(`transformed ${date.getTime()}`);
      return date.getTime();
    }
    return databaseValue;
  }
}
