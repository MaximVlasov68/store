import {
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  ArgumentsHost,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { readFile } from 'fs/promises';
import { compile } from 'handlebars';
import { Response } from 'express';

@Catch(NotFoundException, ForbiddenException)
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message || 'Internal error';

    try {
      const templateFile = await readFile('views/errorPage.hbs');

      const template = compile(templateFile.toString('utf-8'));

      const data = {
        status,
        message,
      };

      return response.end(template(data));
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
