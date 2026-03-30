import { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthController {
    private authService;
    private prisma;
    constructor(authService: AuthService, prisma: PrismaService);
    register(dto: RegisterDto): Promise<{
        user: {
            email: string;
            username: string;
            id: number;
            avatar: string | null;
            bio: string | null;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
        access_token: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            email: string;
            username: string;
            id: number;
            avatar: string | null;
            bio: string | null;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
        access_token: string;
    }>;
    profile(req: ExpressRequest & {
        user: {
            id: number;
        };
    }): Promise<{
        email: string;
        username: string;
        id: number;
        avatar: string | null;
        bio: string | null;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
    }>;
}
