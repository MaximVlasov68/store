import { Controller, Get, Post, Render, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';


@Controller()
export class AppController {
  
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req, @Res() res: Response) {
    if(req.user){
      req.session.user = req.user;
    }
    return res.redirect('/product');
  }

  @Render('loginForm')
  @Get('login')
  async loginForm(@Res() res: Response){
    
  }
  
}
