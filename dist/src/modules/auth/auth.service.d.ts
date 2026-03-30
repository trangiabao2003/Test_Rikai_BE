import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
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
    profile(userId: number): Promise<{
        email: string;
        username: string;
        id: number;
        avatar: string | null;
        bio: string | null;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
    }>;
    private signToken;
}
