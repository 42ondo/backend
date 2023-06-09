import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class StatEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  index: number;

  @Column({type: 'float'})
  evalCnt: number;

  @Column({type: 'float'})
  timeSpentAll : number;

  @Column()
  timeZoneLike : number;
  
  @Column()
  mostSubject : number;
}
