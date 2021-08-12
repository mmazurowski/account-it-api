import { ApplicationModule } from '@application/application-module.type';

export const combineModules = (modules: Array<ApplicationModule[]>): ApplicationModule[] =>
  modules.flatMap((submodule) => submodule);
