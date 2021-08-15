import { Procedure } from '@lunar-flight-v/system';
import * as Awilix from 'awilix';

export class SetupDIContainerProcedure extends Procedure<null, Awilix.AwilixContainer> {
  async run(): Promise<Awilix.AwilixContainer> {
    const container = Awilix.createContainer({
      injectionMode: Awilix.InjectionMode.PROXY,
    });

    return container;
  }
}
