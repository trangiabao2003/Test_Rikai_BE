import { PrismaService } from '../prisma/prisma.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
export declare class StoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateStoryDto, userId: number): Promise<{
        user: {
            username: string;
            id: number;
            avatar: string | null;
        };
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        location: string | null;
        coverImage: string | null;
        travelDate: Date | null;
    }>;
    findAll(): Promise<{
        user: {
            username: string;
            id: number;
            avatar: string | null;
        };
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        location: string | null;
        coverImage: string | null;
        travelDate: Date | null;
    }[]>;
    findOne(id: number): Promise<{
        user: {
            username: string;
            id: number;
            avatar: string | null;
        };
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        location: string | null;
        coverImage: string | null;
        travelDate: Date | null;
    }>;
    update(id: number, dto: UpdateStoryDto, user: {
        id: number;
        role: string;
    }): Promise<{
        user: {
            username: string;
            id: number;
            avatar: string | null;
        };
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        location: string | null;
        coverImage: string | null;
        travelDate: Date | null;
    }>;
    remove(id: number, user: {
        id: number;
        role: string;
    }): Promise<{
        message: string;
    }>;
}
