import { Injectable } from '@nestjs/common';
import { CategoryService } from './admin/category/category.service';

@Injectable()
export class AppService {
  constructor(private readonly categoryService: CategoryService) {}

  async getCommonData() {
    /* Общие переменные для свех страниц */
    const categoriesTree =
      await this.categoryService.getTree(); /* и родительская и детская (дерево)*/
    const { headerItems, footerItems } =
      await this.categoryService.getMenuItems();
    return { categoriesTree, headerItems, footerItems };
  }
}
