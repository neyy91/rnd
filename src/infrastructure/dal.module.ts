import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Card,
  Dictionary,
  Pair,
  Program,
  Progress,
  Role,
  User,
  Subscriber,
  Language,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.POSTGRES_CONNECTION,
        entities: [
          Role,
          User,
          Pair,
          Card,
          Dictionary,
          Program,
          Progress,
          Subscriber,
          Language,
        ],
        extra: {
          max: process.env.POSTGRES_POOL_SIZE,
        },
      }),
    }),
    TypeOrmModule.forFeature([
      Role,
      User,
      Pair,
      Card,
      Dictionary,
      Program,
      Progress,
      Subscriber,
      Language,
    ]),
  ],
})
export class DalModule {}
