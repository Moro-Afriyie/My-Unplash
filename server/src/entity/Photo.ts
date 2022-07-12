import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('photos')
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
