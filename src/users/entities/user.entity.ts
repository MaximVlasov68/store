import { Order } from 'src/admin/order/entities/order.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  Unique,
  OneToMany,
} from 'typeorm';
import { UserRoles } from '../enums/roles';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column({
    unique: true,
  })
  telephoneNumber: string;

  @Column({
    default: 'user',
  })
  role: UserRoles;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
