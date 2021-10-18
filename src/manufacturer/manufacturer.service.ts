import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { Manufacturer, ManufacturerDocument } from './schemas/manufacturer.schema';

@Injectable()

export class ManufacturerService {
  constructor(@InjectModel(Manufacturer.name) private manufacturerModel: Model<ManufacturerDocument>){}

  async create(createManufacturerDto: CreateManufacturerDto) {
    const createdManufacturer = new this.manufacturerModel(createManufacturerDto)
    console.log(createManufacturerDto);
    
    return createdManufacturer.save();
  }

  findAll() {
    return this.manufacturerModel.find();
  }

  async findOne(id: string) {
    return this.manufacturerModel.findById(id);
  }

  async update(id: string, updateManufacturerDto: UpdateManufacturerDto) {
    return this.manufacturerModel.updateOne({_id: id}, updateManufacturerDto);
  }

  async remove(id: string) {
    return this.manufacturerModel.deleteOne({_id: id});
  }
}
