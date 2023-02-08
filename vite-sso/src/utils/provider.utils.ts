import type { Provider } from '@heavyrisem/sso-msa-example-proto';

const providerToString = (provider: Provider) => {
  switch (provider) {
    case 0:
      return 'google';
    default:
      throw new Error('Unknown provider');
  }
};

export default providerToString;
