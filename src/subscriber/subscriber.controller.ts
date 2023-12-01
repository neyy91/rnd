import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SubscribeCommand } from 'src/dto';
import { SubscriberService } from './subscriber.service';

@Controller('subscriber')
export class SubscriberController {
  constructor(private service: SubscriberService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getSubscriptions(@Request() req) {
    return this.service.getSubscriptions(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async subscribe(@Request() req, @Body() command: SubscribeCommand) {
    return this.service.subscribe(command, req.user);
  }
}
