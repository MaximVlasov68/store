import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Render, Query } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { Response } from 'express';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Post()
  async createOrUpdate(@Res() res: Response, @Body() createOrUpdateManufacturerDto: CreateManufacturerDto & UpdateManufacturerDto) {
    if(createOrUpdateManufacturerDto.id){
      await this.manufacturerService.update(createOrUpdateManufacturerDto.id, createOrUpdateManufacturerDto);
    } else {
      console.log(await this.manufacturerService.create(createOrUpdateManufacturerDto));
    }
    
    return res.redirect('/manufacturer')
    
  }

  @Get()
  @Render('manufacturer')
  async findAll(@Query('id') id?: string) {
    let manufacturer
    if(id){
      manufacturer = await this.manufacturerService.findOne(id);
    } 
      const manufacturerList = await this.manufacturerService.findAll();
      return {manufacturerList, manufacturer};
  
  }
  
  @Get(':id/delete')
  async remove(@Res() res: Response, @Param('id') id: string) {
    await this.manufacturerService.remove(id);
    return res.redirect('/manufacturer');
  }
}
