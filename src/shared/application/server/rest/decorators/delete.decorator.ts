import { Router } from 'express';

export const Delete = (route = '/') =>
  // eslint-disable-next-line func-names
  function (target: any, propertyKey: string) {
    if (!target.router) {
      Reflect.set(target, 'router', Router());
    }

    Reflect.set(target, 'routes', {
      ...target.routes,
      delete: { ...target.routes?.delete, [route]: propertyKey },
    });
  };
