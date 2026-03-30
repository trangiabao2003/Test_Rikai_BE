import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';

const storySelect = {
  id: true,
  title: true,
  content: true,
  location: true,
  coverImage: true,
  travelDate: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: { id: true, username: true, avatar: true },
  },
};

@Injectable()
export class StoriesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateStoryDto, userId: number) {
    return this.prisma.story.create({
      data: {
        ...dto,
        travelDate: dto.travelDate ? new Date(dto.travelDate) : undefined,
        userId,
      },
      select: storySelect,
    });
  }

  async findAll() {
    return this.prisma.story.findMany({
      select: storySelect,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const story = await this.prisma.story.findUnique({
      where: { id },
      select: storySelect,
    });
    if (!story) throw new NotFoundException('Story not found');
    return story;
  }

  async update(
    id: number,
    dto: UpdateStoryDto,
    user: { id: number; role: string },
  ) {
    const story = await this.prisma.story.findUnique({ where: { id } });
    if (!story) throw new NotFoundException('Story not found');
    if (story.userId !== user.id && user.role !== 'ADMIN')
      throw new ForbiddenException('Access denied');

    return this.prisma.story.update({
      where: { id },
      data: {
        ...dto,
        travelDate: dto.travelDate ? new Date(dto.travelDate) : undefined,
      },
      select: storySelect,
    });
  }

  async remove(id: number, user: { id: number; role: string }) {
    const story = await this.prisma.story.findUnique({ where: { id } });
    if (!story) throw new NotFoundException('Story not found');
    if (story.userId !== user.id && user.role !== 'ADMIN')
      throw new ForbiddenException('Access denied');

    await this.prisma.story.delete({ where: { id } });
    return { message: 'Story deleted successfully' };
  }
}
