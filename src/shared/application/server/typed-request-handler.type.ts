import { RequestHandler } from 'express';
import * as core from 'express-serve-static-core';

export type TypedRequestHandler<T, K> = RequestHandler<core.ParamsDictionary, any, T, K>;
