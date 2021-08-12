import serviceProviderAccessModule from './service-provider-access';
import { combineModules } from '@application/combine-modules.function';

const modules = combineModules([serviceProviderAccessModule]);

export default modules;
