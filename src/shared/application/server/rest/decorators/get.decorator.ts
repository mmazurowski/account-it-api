import { Router } from 'express';
import 'reflect-metadata';

export const Get = (route = '/') =>
  // eslint-disable-next-line func-names
  function (target: any, propertyKey: string) {
    if (!target.router) {
      Reflect.set(target, 'router', Router());
    }

    Reflect.set(target, 'routes', {
      ...target.routes,
      get: { ...target.routes?.get, [route]: propertyKey },
    });
  };
