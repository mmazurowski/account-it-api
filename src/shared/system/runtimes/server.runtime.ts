import { StartServerProcedure } from '@system/procedures/start-server.procedure';
import { baseRuntime } from '@system/runtimes/base.runtime';

const serverRuntime = [...baseRuntime, new StartServerProcedure()];

export { serverRuntime };
