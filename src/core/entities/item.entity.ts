import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn} from 'typeorm';

@Entity({ name: 'item' })
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  price!: number;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}