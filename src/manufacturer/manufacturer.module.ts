import { Module } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerController } from './manufacturer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Manufacturer, ManufacturerSchema } from './schemas/manufacturer.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: Manufacturer.name, schema: ManufacturerSchema }])],
  controllers: [ManufacturerController],
  providers: [ManufacturerService],
  exports:[ManufacturerService]
})
export class ManufacturerModule {}
