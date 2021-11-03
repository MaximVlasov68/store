import { Controller, UseGuards, Get, Render } from "@nestjs/common";
import { SessionAuthGuard } from "src/auth/session-auth.guard";

@Controller()
@UseGuards(SessionAuthGuard)
export class AdminController {
    @Get()
    @Render('admin-list')
    list() {}
}