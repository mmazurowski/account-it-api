import 'reflect-metadata';

import { SetupDIContainerProcedure } from '@system/procedures/setup-di-container.procedure';
import { BindSystemCoreDependenciesProcedure } from '@system/procedures/bind-system-core-dependencies.procedure';
import { RegisterModulesProcedure } from '@system/procedures/register-modules.procedure';
import { PrepareServerProcedure } from '@system/procedures/prepare-server.procedure';
import { HandleExitProcedure } from '@system/procedures/handle-exit.procedure';

const baseRuntime = [
  new SetupDIContainerProcedure(),
  new BindSystemCoreDependenciesProcedure(),
  new HandleExitProcedure(),
  new RegisterModulesProcedure(),
  new PrepareServerProcedure(),
];

export { baseRuntime };
