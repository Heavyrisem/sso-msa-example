export const promisify = <T>(callback: () => T): Promise<T> => {
  return new Promise((resolve, reject) => {
    try {
      resolve(callback());
    } catch (err) {
      reject(err);
    }
  });
};
