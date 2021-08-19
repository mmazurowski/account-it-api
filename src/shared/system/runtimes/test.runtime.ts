/* eslint-disable global-require */
/* eslint-disable import/first */

require('dotenv').config();

import { baseRuntime } from '@system/runtimes/base.runtime';

const testRuntime = [...baseRuntime];

export { testRuntime };
