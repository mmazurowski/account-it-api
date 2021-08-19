import serviceProviderAccessModule from './auth';
import { combineModules } from '@application/combine-modules.function';

const modules = combineModules([serviceProviderAccessModule]);

export default modules;
