import { DataSource } from 'typeorm';
import { Community } from './community.entity';

export const contactProviders = [
  {
    provide: 'COMMUNITY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Community),
    inject: ['DATA_SOURCE'],
  },
];