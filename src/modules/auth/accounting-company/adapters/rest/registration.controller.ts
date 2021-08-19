import { ExpressController } from '@application/server/rest/express.controller';
import { RequestHandler } from 'express';
import { Post } from '@application/server/rest/decorators/post.decorator';
import { createServiceProviderActionValidation } from '@modules/auth/accounting-company/adapters/rest/create-service-provider/create-service-provider.action';

interface Dependencies {
  createServiceProviderAction: RequestHandler;
}

export class RegistrationController extends ExpressController {
  constructor(private readonly dependencies: Dependencies) {
    super('/service-provider');
  }

  @Post()
  registerCompanyAsProvider(): RequestHandler[] {
    return [createServiceProviderActionValidation, this.dependencies.createServiceProviderAction];
  }
}
