import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initialization1715226488935 implements MigrationInterface {
  name = 'Initialization1715226488935';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` uuid NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`isAdmin\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`report\` (\`id\` uuid NOT NULL, \`isApproved\` tinyint NOT NULL DEFAULT 0, \`price\` int NOT NULL, \`make\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`year\` int NOT NULL, \`lng\` int NOT NULL, \`lat\` int NOT NULL, \`mileage\` int NOT NULL, \`userId\` uuid NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` ADD CONSTRAINT \`FK_e347c56b008c2057c9887e230aa\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`report\` DROP FOREIGN KEY \`FK_e347c56b008c2057c9887e230aa\``,
    );
    await queryRunner.query(`DROP TABLE \`report\``);
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
