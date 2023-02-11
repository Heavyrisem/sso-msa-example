import { ValueTransformer } from 'typeorm';

import { Logger } from '@nestjs/common';

export class DateTransformer implements ValueTransformer {
  logger = new Logger(DateTransformer.name);

  to(entityValue?: number) {
    this.logger.verbose(`to ${entityValue}`);

    if (entityValue) return new Date(entityValue);
    else return entityValue;
  }
  from(databaseValue?: Date) {
    this.logger.verbose(`from ${databaseValue}`);

    if (databaseValue) {
      const date = new Date(databaseValue);
      this.logger.verbose(`transformed ${date.getTime()}`);
      return date.getTime();
    }
    return databaseValue;
  }
}
