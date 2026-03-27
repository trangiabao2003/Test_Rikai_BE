import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        email: string;
        username: string;
        id: number;
        avatar: string | null;
        bio: string | null;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        _count: {
            stories: number;
        };
    }[]>;
    findOne(id: number): Promise<{
        email: string;
        username: string;
        id: number;
        avatar: string | null;
        bio: string | null;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        stories: {
            id: number;
            createdAt: Date;
            title: string;
            location: string | null;
            coverImage: string | null;
        }[];
    }>;
    update(id: number, dto: UpdateUserDto, user: {
        id: number;
        role: string;
    }): Promise<{
        email: string;
        username: string;
        id: number;
        avatar: string | null;
        bio: string | null;
        createdAt: Date;
    }>;
    updateRole(id: number, role: string): Promise<{
        email: string;
        username: string;
        id: number;
        role: import("@prisma/client").$Enums.Role;
    }>;
    remove(id: number, user: {
        id: number;
        role: string;
    }): Promise<{
        message: string;
    }>;
}
