import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

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
}
