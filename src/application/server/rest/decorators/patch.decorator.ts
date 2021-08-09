import { Router } from 'express';

export const Patch = (route = '/') =>
  // eslint-disable-next-line func-names
  function (target: any, propertyKey: string) {
    if (!target.router) {
      Reflect.set(target, 'router', Router());
    }

    Reflect.set(target, 'routes', {
      ...target.routes,
      patch: { ...target.routes?.patch, [route]: propertyKey },
    });
  };
