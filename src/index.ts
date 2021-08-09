/* eslint-disable global-require */
/* eslint-disable import/first */

require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
  require('module-alias/register');
}

import 'reflect-metadata';
import { System } from '@lunar-flight-v/system';
import { serverRuntime } from '@system/runtimes/server.runtime';

const system = new System();

(async () => {
  await system.execute(serverRuntime);
})();
