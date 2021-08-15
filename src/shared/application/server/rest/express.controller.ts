import 'reflect-metadata';
import { Router } from 'express';

export class ExpressController {
  protected readonly route: string;

  constructor(route?: string) {
    this.route = route ?? '';
  }

  public getRouter(): Router {
    // @ts-ignore-next-line
    Object.keys(this.routes).forEach((method) => {
      // @ts-ignore-next-line
      Object.keys(this.routes[method]).forEach((route) => {
        const compoundRoute = `${this.route}${route}`; // @ts-ignore
        // @ts-ignore-next-line
        this.router[method](compoundRoute, this[this.routes[method][route]].bind(this)());
      });
    });

    // @ts-ignore
    return this.router;
  }
}
