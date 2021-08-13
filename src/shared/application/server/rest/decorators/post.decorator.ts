import { Router } from 'express';

export const Post = (route = '/') =>
  // eslint-disable-next-line func-names
  function (target: any, propertyKey: string) {
    if (!target.router) {
      Reflect.set(target, 'router', Router());
    }

    Reflect.set(target, 'routes', {
      ...target.routes,
      post: { ...target.routes?.post, [route]: propertyKey },
    });
  };
