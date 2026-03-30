import { StoriesService } from './stories.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
interface AuthRequest extends Request {
    user: {
        id: number;
        email: string;
        role: string;
    };
}
export declare class StoriesController {
    private storiesService;
    constructor(storiesService: StoriesService);
    create(dto: CreateStoryDto, req: AuthRequest): Promise<{
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
    update(id: number, dto: UpdateStoryDto, req: AuthRequest): Promise<{
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
    remove(id: number, req: AuthRequest): Promise<{
        message: string;
    }>;
}
export {};
