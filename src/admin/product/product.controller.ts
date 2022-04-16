import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Redirect,
  Res,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response, Express } from 'express';
import { CategoryService } from '../category/category.service';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { SessionAuthGuard } from 'src/auth/session-auth.guard';
import { AdminRequired } from '../admin.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { writeFile, unlink } from 'fs/promises';
import { randomUUID } from 'crypto';
import { join } from 'path';

@Controller()
@AdminRequired()
@UseGuards(SessionAuthGuard)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly manufacturerService: ManufacturerService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async createOrUpdate(
    @Res() res: Response,
    @Body() createOrUpdateProductDto: CreateProductDto | UpdateProductDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    if (images.length > 0) {
      createOrUpdateProductDto.images = [];
      await Promise.all(
        images.map(async (image) => {
          const imageExt = image.mimetype === 'image/jpeg' ? 'jpg' : 'png';
          const imageName = randomUUID();
          const imagePath = join(
            __dirname,
            '..',
            '..',
            '..',
            'public',
            'img',
            'product-images',
          );
          const imageFullPath = `${imagePath}/${imageName}.${imageExt}`;
          await writeFile(imageFullPath, image.buffer);
          createOrUpdateProductDto.images.push(`${imageName}.${imageExt}`);
        }),
      );
    }

    if ('id' in createOrUpdateProductDto) {
      if (typeof createOrUpdateProductDto.id === 'string') {
        createOrUpdateProductDto.id = parseInt(createOrUpdateProductDto.id);
      }

      const oldProduct = await this.productService.findOne(
        createOrUpdateProductDto.id,
      );
      try {
        if (images.length > 0) {
          await Promise.all(
            oldProduct.images.map((image) =>
              unlink(
                join(
                  __dirname,
                  '..',
                  '..',
                  '..',
                  'public',
                  'img',
                  'product-images',
                  image,
                ),
              ),
            ),
          );
        }
      } catch {}

      await this.productService.update(createOrUpdateProductDto.id, {
        ...createOrUpdateProductDto,
        isAvailable: Boolean(createOrUpdateProductDto.isAvailable),
        showInSlider: Boolean(createOrUpdateProductDto.showInSlider),
        showInRecommended: Boolean(createOrUpdateProductDto.showInRecommended),
      });
    } else {
      await this.productService.create({
        ...createOrUpdateProductDto,
        isAvailable: Boolean(createOrUpdateProductDto.isAvailable),
        showInSlider: Boolean(createOrUpdateProductDto.showInSlider),
        showInRecommended: Boolean(createOrUpdateProductDto.showInRecommended),
      });
    }

    return res.redirect('/admin/product');
  }

  @Get()
  @Render('product')
  async findAll(@Query('id') id?: number) {
    let product;
    if (id) {
      product = await this.productService.findOne(id);
    }
    const categoryList = await this.categoryService.getAll();
    const manufacturerList = await this.manufacturerService.findAll();
    const productList = await this.productService.findAll();
    return { productList, categoryList, manufacturerList, product };
  }

  @Get(':id/delete')
  async remove(@Res() res: Response, @Param('id') id: number) {
    await this.productService.remove(id);
    return res.redirect('/admin/product');
  }
}
