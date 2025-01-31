import { DataSource } from 'typeorm';
import { Item } from './entities/item.entity';
import { config } from './config';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  entities: [Item],
  synchronize: true,
  logging: true,
});