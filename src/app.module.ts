import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { UserModule } from './user/user.module';

@Module({
  // imports: [EmployeeModule, 
  //   TypeOrmModule.forRoot({
  //     type:'postgres',
  //     host:'localhost',
  //     port:5432,
  //     username:'root',
  //     password:'root',
  //     database:'pocdb',
  //     autoLoadEntities:true,
  //     synchronize:true
  //   })],
    imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [join(process.cwd(), 'dist/**/*.entity.js')],
          // do NOT use synchronize: true in real projects
          synchronize: true,
        }),
      }),
      EmployeeModule,
      UserModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
