import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ProductModule, 
    MongooseModule.forRoot('mongodb+srv://max:max123@cluster0.g3rgo.mongodb.net/store?retryWrites=true&w=majority')
  ],  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
