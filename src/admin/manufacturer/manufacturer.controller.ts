import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Render,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { Response } from 'express';
import { AdminRequired } from '../admin.decorator';
import { SessionAuthGuard } from 'src/auth/session-auth.guard';

@Controller()
@AdminRequired()
@UseGuards(SessionAuthGuard)
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Post()
  async createOrUpdate(
    @Res() res: Response,
    @Body()
    createOrUpdateManufacturerDto:
      | CreateManufacturerDto
      | UpdateManufacturerDto,
  ) {
    if ('id' in createOrUpdateManufacturerDto) {
      await this.manufacturerService.update(
        createOrUpdateManufacturerDto.id,
        createOrUpdateManufacturerDto,
      );
    } else {
      await this.manufacturerService.create(createOrUpdateManufacturerDto);
    }

    return res.redirect('/admin/manufacturer');
  }

  @Get()
  @Render('manufacturer')
  async find(@Query('id') id?: number) {
    let manufacturer;
    if (id) {
      manufacturer = await this.manufacturerService.findOne(id);
    }
    const manufacturerList = await this.manufacturerService.findAll();
    return { manufacturerList, manufacturer };
  }

  @Get(':id/delete')
  async remove(@Res() res: Response, @Param('id') id: number) {
    await this.manufacturerService.remove(id);
    return res.redirect('/admin/manufacturer');
  }
}
