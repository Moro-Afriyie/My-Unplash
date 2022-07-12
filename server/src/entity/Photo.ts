import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	label: string;

	@Column('text')
	imageUrl: string;

	@CreateDateColumn()
	createdAt: Date;
}
