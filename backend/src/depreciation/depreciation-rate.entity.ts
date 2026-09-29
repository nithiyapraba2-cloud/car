import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('depreciation_rates')
export class DepreciationRate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  category!: string;

  @Column({ type: 'float' })
  firstYearRate!: number;

  @Column({ type: 'float' })
  yearlyRate!: number;
}
