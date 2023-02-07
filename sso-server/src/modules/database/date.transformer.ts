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
      this.logger.debug(`transformed ${databaseValue.getTime()}`);
      return databaseValue.getTime();
    }
    return databaseValue;
  }
}
