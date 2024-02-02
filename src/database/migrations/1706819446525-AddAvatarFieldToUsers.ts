import {type MigrationInterface, type QueryRunner, TableColumn} from 'typeorm';

export default class AddAvatarFieldToUsers1706819446525 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn('users', new TableColumn({
			name: 'avatar',
			type: 'varchar',
			isNullable: true,
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('users', 'avatar');
	}
}
