import { Observable, catchError, EMPTY } from 'rxjs';

export const getResultFromObservable = <T>(observable: Observable<T>): Promise<Required<T>> => {
  return new Promise((resolve, reject) => {
    observable
      .pipe(
        catchError((err) => {
          reject(err);
          return EMPTY;
        }),
      )
      .subscribe((data) => resolve(data as Required<typeof data>));
  });
};
