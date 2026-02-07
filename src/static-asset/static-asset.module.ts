import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','..', 'upload'),
      serveRoot: '/api/v1/images',
      serveStaticOptions: {
        index: false,
        maxAge: 31536000000, // 1 year cache
      },
    }),
  ],
})
export class StaticAssetModule {}
