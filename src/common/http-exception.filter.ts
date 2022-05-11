import {
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  ArgumentsHost,
  NotFoundException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { readFile } from 'fs/promises';
import * as hbs from 'handlebars';
import { Request, Response } from 'express';
import { join } from 'path';
import { AppService } from 'src/app.service';

@Catch(NotFoundException, ForbiddenException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private handlebars: any, private appService: AppService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message || 'Internal error';

    const user = (request.session as any).user; /* отключить проверку типов */
    const commonData = await this.appService.getCommonData();

    try {
      const templateFile = await readFile('views/errorPage.hbs');

      const template = this.handlebars.compile(templateFile.toString('utf-8'));

      const data = {
        status,
        message,
        user,
        ...commonData,
      };

      return response.end(template(data));
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
