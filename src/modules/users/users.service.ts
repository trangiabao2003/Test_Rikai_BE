import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        bio: true,
        role: true,
        createdAt: true,
        _count: { select: { stories: true } },
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        bio: true,
        role: true,
        createdAt: true,
        stories: {
          select: {
            id: true,
            title: true,
            location: true,
            coverImage: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(
    id: number,
    dto: UpdateUserDto,
    user: { id: number; role: string },
  ) {
    if (id !== user.id && user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }
    return this.prisma.user.update({
      where: { id },
      data: dto,
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        bio: true,
        createdAt: true,
      },
    });
  }

  async updateRole(id: number, role: string) {
    if (role !== 'USER' && role !== 'ADMIN') {
      throw new BadRequestException('Invalid role');
    }
    return this.prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    });
  }

  async remove(id: number, user: { id: number; role: string }) {
    if (id !== user.id && user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted successfully' };
  }
}
