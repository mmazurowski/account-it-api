import { Procedure } from '@lunar-flight-v/system';
import * as Awilix from 'awilix';
import { AwilixContainer } from 'awilix';
import { createConnection } from 'typeorm';

export class SetupOrmProcedure extends Procedure<Awilix.AwilixContainer, Awilix.AwilixContainer> {
  async run(container: AwilixContainer): Promise<AwilixContainer> {
    const entitiesPaths =
      process.env.NODE_ENV === 'development'
        ? ['src/modules/**/**/**/infrastructure/entities/*.entity.ts']
        : ['dist/modules/**/**/**/infrastructure/database/*.entity.js'];

    await createConnection({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: entitiesPaths,
      synchronize: true,
    });

    return container;
  }
}
