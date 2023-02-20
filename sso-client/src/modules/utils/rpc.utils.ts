export const HandleRpcException = () => (target: any, key: string, desc: PropertyDescriptor) => {
  const isMethod = desc.value instanceof Function;
};

export const RpcExceptionHandler = <T extends Function>(target: T) => {
  console.log(target, Object.getOwnPropertyNames(target.prototype));
  console.log(target.prototype, Object.getOwnPropertyDescriptors(target.prototype));
  for (const propertyName in Object.getOwnPropertyNames(target.prototype)) {
    console.log('debug', propertyName);
    const propertyValue = target.prototype[propertyName];
    const isMethod = propertyValue instanceof Function;
    if (!isMethod) {
      console.log('not method');
      continue;
    }

    const descriptor = getMethodDescriptor(propertyName);
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log('The method args are: ' + JSON.stringify(args));
      const result = originalMethod.apply(this, args);
      console.log('The return value is: ' + result);
      return result;
    };

    Object.defineProperty(target.prototype, propertyName, descriptor);
  }

  function getMethodDescriptor(propertyName: string): TypedPropertyDescriptor<any> {
    if (target.prototype.hasOwnProperty(propertyName))
      return Object.getOwnPropertyDescriptor(target.prototype, propertyName);

    // create a new property descriptor for the base class' method
    return {
      configurable: true,
      enumerable: true,
      writable: true,
      value: target.prototype[propertyName],
    };
  }
};

class Test {
  a() {
    return 1;
  }
}
