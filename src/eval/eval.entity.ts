import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class EvalEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  index: number;
  @Column({ unique: true })
  id: number;
  @Column()
  comment: string;
  @Column()
  from: number;
  @Column()
  beginAt: string;
  @Column()
  filledAt: string;
  @Column()
  duration: number;
  @Column()
  isOutStanding: boolean;
  @Column()
  projectId: number;
}
