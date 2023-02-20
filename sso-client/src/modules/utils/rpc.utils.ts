import { RpcException } from '@nestjs/microservices';

export const HandleRpcException = (target: any, key: string, desc: PropertyDescriptor) => {
  const method = desc.value;

  desc.value = () => {
    try {
      method();
    } catch (err) {
      throw new RpcException(err);
    }
  };
};
