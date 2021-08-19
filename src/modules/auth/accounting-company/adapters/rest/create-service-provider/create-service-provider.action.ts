import { CQRSBus } from '@lunar-flight-v/command-module';
import { RegisterCompanyAsServiceProviderCommand } from '@modules/auth/accounting-company/application/commands/register-company-as-service-provider/register-company-as-service-provider.command';
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

/**
 * @swagger
 * /service-provider:
 *   post:
 *     tags:
 *       - Service Provider
 *     security: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               businessName:
 *                 type: string
 *               vatID:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               city:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               regon:
 *                 type: integer
 *                 example: 123456789
 *     responses:
 *       201:
 *         description: Service provider created
 *       401:
 *         description: Unauthorized error
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal Server error
 */

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
