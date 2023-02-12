import { ValueTransformer } from 'typeorm';

export class DateTransformer implements ValueTransformer {
  to(entityValue?: number) {
    if (entityValue) return new Date(entityValue);
    else return entityValue;
  }
  from(databaseValue?: Date) {
    if (databaseValue) {
      const date = new Date(databaseValue);
      return date.getTime();
    }
    return databaseValue;
  }
}
