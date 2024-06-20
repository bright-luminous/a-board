import { DataSource } from 'typeorm';
import { Contact } from './comment.entity';

export const contactProviders = [
  {
    provide: 'COMMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Contact),
    inject: ['DATA_SOURCE'],
  },
];