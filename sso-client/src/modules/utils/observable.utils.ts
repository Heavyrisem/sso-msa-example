import { Observable } from '@heavyrisem/sso-msa-example-proto';

export const getResultFromObservable = <T>(observable: Observable<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    try {
      observable.subscribe(resolve);
    } catch (err) {
      console.log('ERR', err);
      reject(err);
    }
  });
};
