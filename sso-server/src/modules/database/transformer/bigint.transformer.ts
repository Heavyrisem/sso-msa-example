import { ValueTransformer } from 'typeorm';

export class BigintTransformer implements ValueTransformer {
  to(entityValue?: number) {
    return entityValue;
  }
  from(databaseValue?: string) {
    if (databaseValue) return Number(databaseValue);
    return databaseValue;
  }
}
