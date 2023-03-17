import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, } from 'typeorm';

  @Entity()
  export class WordEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number; // 고유 번호 할당 x
	@Column()
	word: string; // word에 대한 문자열
	@Column()
	evalId: number; // evalEntity Id
  }
  