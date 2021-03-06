import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Manufacturer } from '../../manufacturer/entities/manufacturer.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column()
  price: number;

  @Column('varchar', { array: true, default: [] })
  images: string[];

  @Column()
  color: string;

  @Column({ type: 'decimal' })
  weight: number;

  @Column()
  size: string;

  @Column()
  isAvailable: boolean;

  @Column({ type: 'text', default: '' })
  description: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.products)
  manufacturer: Manufacturer;

  @Column({ default: false })
  showInSlider: boolean;

  @Column({ default: false })
  showInRecommended: boolean;
}
