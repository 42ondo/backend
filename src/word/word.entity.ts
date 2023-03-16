import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	Unique,
  } from 'typeorm';
  
  @Entity()
  export class WordEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	word: string;
	@Column()
	evalId: number;
  }
  