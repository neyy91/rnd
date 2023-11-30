import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import { RolesModule } from './roles/roles.module';
import { DalModule } from './infrastructure';
import { AuthModule } from './auth/auth.module';
import { PairModule } from './pair/pair.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { CardModule } from './card/card.module';
import { LanguageModule } from './language/language.module';
import { SubscriberModule } from './subscriber/subscriber.module';
import { ProgramModule } from './program/program.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UsersModule,
    RolesModule,
    DalModule,
    AuthModule,
    PairModule,
    DictionaryModule,
    CardModule,
    LanguageModule,
    SubscriberModule,
    ProgramModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
