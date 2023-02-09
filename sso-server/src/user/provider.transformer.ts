import { Provider, providerToString, stringToProvider } from '@heavyrisem/sso-msa-example-proto';
import { ValueTransformer } from 'typeorm';

import { Logger } from '@nestjs/common';

export class ProviderTransformer implements ValueTransformer {
  logger = new Logger(ProviderTransformer.name);

  to(entityValue: Provider) {
    return providerToString(entityValue);
  }
  from(databaseValue: string) {
    return stringToProvider(databaseValue);
  }
}
