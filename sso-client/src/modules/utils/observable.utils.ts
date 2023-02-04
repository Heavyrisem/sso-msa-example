import { Observable } from '@heavyrisem/sso-msa-example-proto';

export const getResultFromObservable = <T>(observable: Observable<T>): Promise<T> => {
  return new Promise((resolve) => {
    observable.subscribe(resolve);
  });
};
