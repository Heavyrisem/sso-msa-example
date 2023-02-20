import { RpcException } from '@nestjs/microservices';

export const HandleRpcException = () => (target: any, key: string, desc: PropertyDescriptor) => {
  const isMethod = desc.value instanceof Function;
  if (!isMethod) return;

  Reflect.defineMetadata(key, true, target);
};

export const RpcExceptionHandler =
  () =>
  <T extends Function>(target: T) => {
    for (const propertyName of Object.getOwnPropertyNames(target.prototype)) {
      const descriptor = Object.getOwnPropertyDescriptor(target.prototype, propertyName);
      const shouldHandle = Reflect.getMetadata(propertyName, target.prototype);
      const isMethod = descriptor.value instanceof Function;
      if (!shouldHandle || !isMethod) continue;

      const originalMethod = descriptor.value;
      descriptor.value = function (...args: any[]) {
        const result = originalMethod.apply(this, args);

        if (result instanceof Promise) {
          return result.catch((e) => {
            throw new RpcException(e);
          });
        }

        return result;
      };

      Object.defineProperty(target.prototype, propertyName, descriptor);
    }
  };
