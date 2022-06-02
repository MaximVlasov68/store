import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  Render,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { SessionAuthGuard } from 'src/auth/session-auth.guard';
import { AdminRequired } from '../admin.decorator';
import { LoadTableItems } from '../interfaces/loadTableItems.dto';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller()
@AdminRequired()
@UseGuards(SessionAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createOrUpdate(
    @Res() res: Response,
    @Body() createOrUpdateCategoryDto: CreateCategoryDto | UpdateCategoryDto,
  ) {
    const params = {
      ...createOrUpdateCategoryDto,
      parentCategory: createOrUpdateCategoryDto.parentCategory || null,
      showInHeader: Boolean(createOrUpdateCategoryDto.showInHeader),
      showInFooter: Boolean(createOrUpdateCategoryDto.showInFooter),
    };
    if ('id' in createOrUpdateCategoryDto) {
      await this.categoryService.update(params as UpdateCategoryDto);
    } else {
      await this.categoryService.create(params as CreateCategoryDto);
    }
    return res.redirect('/admin/category');
  }

  @Get()
  @Render('category')
  async find(@Query('id') id?: number) {
    let category: Category | null;
    if (id) {
      category = await this.categoryService.findOne(id);
    }
    const categoryList = await this.categoryService.getAll();
    const parentCategoryList = await this.categoryService.getRoots();
    return { categoryList, parentCategoryList, category };
  }

  @Get(':id/delete')
  async remove(@Res() res: Response, @Param('id') id: number) {
    await this.categoryService.remove(id);
    return res.redirect('/admin/category');
  }

  @Post('loadItems')
  async loadItems(
    @Body() loadTableItemsDto: LoadTableItems,
    @Body('draw', ParseIntPipe)
    draw: number /* приведение draw к типу number */,
  ) {
    const { start, length, search, columns, order } = loadTableItemsDto;

    const ordering = Object.fromEntries(
      order.map((orderElement) => [
        columns[orderElement.column].data,
        orderElement.dir.toUpperCase() as 'asc' | 'desc',
      ]),
    );
    console.log(ordering);

    const [data, recordsFiltered] = await this.categoryService.findAndCount({
      start,
      length,
      search: search.value,
      order: ordering,
    });
    const recordsTotal = await this.categoryService.count();
    return { data, draw, recordsTotal, recordsFiltered };
  }
}
