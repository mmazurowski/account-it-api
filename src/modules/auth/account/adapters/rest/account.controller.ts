import { ExpressController } from '@application/server/rest/express.controller';
import { RequestHandler } from 'express';
import { Post } from '@application/server/rest/decorators/post.decorator';
import { loginActionValidation } from '@modules/auth/account/adapters/rest/login/login.action';

interface Dependencies {
  loginAction: RequestHandler;
}

export class AccountController extends ExpressController {
  constructor(private readonly dependencies: Dependencies) {
    super('/auth');
  }

  @Post('/login')
  public login(): RequestHandler[] {
    return [loginActionValidation, this.dependencies.loginAction];
  }
}
