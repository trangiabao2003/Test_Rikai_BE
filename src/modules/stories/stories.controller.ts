import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { StoriesService } from './stories.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Public } from '../auth/public.decorator';

interface AuthRequest extends Request {
  user: { id: number; email: string; role: string };
}

@Controller('stories')
export class StoriesController {
  constructor(private storiesService: StoriesService) {}

  @Post()
  create(@Body() dto: CreateStoryDto, @Request() req: AuthRequest) {
    return this.storiesService.create(dto, req.user.id);
  }

  @Public()
  @Get()
  findAll() {
    return this.storiesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.storiesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStoryDto,
    @Request() req: AuthRequest,
  ) {
    return this.storiesService.update(id, dto, req.user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.storiesService.remove(id, req.user);
  }
}
