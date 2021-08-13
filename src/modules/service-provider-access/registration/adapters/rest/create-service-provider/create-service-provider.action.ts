import { CQRSBus } from '@lunar-flight-v/command-module';
import { RegisterCompanyAsServiceProviderCommand } from '@modules/service-provider-access/registration/application/commands/register-company-as-service-provider/register-company-as-service-provider.command';
import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';
import { TypedRequestHandler } from '@application/server/typed-request-handler.type';

interface Dependencies {
  cqrsBus: CQRSBus;
}

interface RequestBody {
  email: string;
  businessName: string;
  vatID: string;
  password: string;
  regon: number;
  address: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
}

export const createServiceProviderActionValidation = celebrate(
  {
    [Segments.BODY]: {
      businessName: Joi.string().required().trim(),
      vatID: Joi.string().required().trim(),
      regon: Joi.number().required(),
      password: Joi.string().required().trim(),
      address: Joi.string().required().trim(),
      postalCode: Joi.string().required().trim(),
      city: Joi.string().required().trim(),
      phoneNumber: Joi.string().required().trim(),
      email: Joi.string().email().required(),
    },
  },
  {
    abortEarly: false,
  },
);

const createServiceProviderAction = ({
  cqrsBus,
}: Dependencies): TypedRequestHandler<RequestBody, {}> => (req, res, next) =>
  cqrsBus
    .handle(new RegisterCompanyAsServiceProviderCommand({ ...req.body }))
    .then(() => res.sendStatus(201))
    .catch(next);

export default createServiceProviderAction;
