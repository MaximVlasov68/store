import { Controller, UseGuards, Get, Render } from '@nestjs/common';
import { SessionAuthGuard } from 'src/auth/session-auth.guard';
import { AdminRequired } from './admin.decorator';

@Controller()
@AdminRequired()
@UseGuards(SessionAuthGuard)
export class AdminController {
  @Get()
  @Render('admin-list')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  list() {}
}
