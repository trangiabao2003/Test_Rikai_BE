import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
interface AuthRequest extends Request {
    user: {
        id: number;
        email: string;
        role: string;
    };
}
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
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
    update(id: number, dto: UpdateUserDto, req: AuthRequest): Promise<{
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
    remove(id: number, req: AuthRequest): Promise<{
        message: string;
    }>;
}
export {};
