import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SilhouetteModule } from './features/silhouette/silhouette.module';
import { AuthModule } from './features/auth/auth.module';
import { UserModule } from './features/user/user.module';
import { WebhookModule } from './features/webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
    SilhouetteModule,
    UserModule,
    WebhookModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
