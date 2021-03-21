import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserTypesSeed } from '@shared/infra/typeorm/seeds/user_types.seed';
import UserType from '@domains/users/infra/typeorm/entities/UserTypes';

export class SeedUserTypes1616236920804 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const userTypeObj of UserTypesSeed) {
      const userType = new UserType();
      userType.name = userTypeObj.name;
      userType.description = userTypeObj.description;
      await queryRunner.manager.save(userType);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
