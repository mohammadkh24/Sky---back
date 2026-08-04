import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Property {
  @PrimaryColumn()
  id: number;

  @Column({
    default: false,
  })
  isVip: boolean;

  @Column()
  title: string;

  @Column('bigint')
  price: number;

  @Column()
  location: string;

  @Column()
  area: number;

  @Column()
  bedrooms: number;

  @Column({
    nullable: true,
  })
  description: string;

  @Column('simple-json', {
    nullable: true,
  })
  facilities: string[];

  @Column('simple-json', {
    nullable: true,
  })
  images: string[];

  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;
}
