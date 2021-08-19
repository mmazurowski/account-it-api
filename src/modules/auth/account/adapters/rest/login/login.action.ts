import { CQRSBus } from '@lunar-flight-v/command-module';
import { LoginCommand } from '@modules/auth/account/application/commands/login/login.command';
import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';
import { TypedRequestHandler } from '@application/server/typed-request-handler.type';

interface Dependencies {
  cqrsBus: CQRSBus;
}

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Auth
 *     security: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tokens obtained
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized error
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal Server error
 */

export const loginActionValidation = celebrate(
  {
    [Segments.BODY]: {
      email: Joi.string().trim().required().email(),
      password: Joi.string().trim().required(),
    },
  },
  {
    abortEarly: false,
  },
);

const loginAction = ({
  cqrsBus,
}: Dependencies): TypedRequestHandler<{ email: string; password: string }, {}> => (
  req,
  res,
  next,
) =>
  cqrsBus
    .handle(new LoginCommand({ email: req.body.email, password: req.body.password }))
    .then(({ shortLiveToken, longLiveToken }) =>
      res
        .cookie('JWT', longLiveToken, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
          secure: true,
        })
        .status(200)
        .json({ token: shortLiveToken }),
    )
    .catch(next);

export default loginAction;
