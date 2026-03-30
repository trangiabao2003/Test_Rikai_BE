"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
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
let StoriesService = class StoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, userId) {
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
    async findOne(id) {
        const story = await this.prisma.story.findUnique({
            where: { id },
            select: storySelect,
        });
        if (!story)
            throw new common_1.NotFoundException('Story not found');
        return story;
    }
    async update(id, dto, user) {
        const story = await this.prisma.story.findUnique({ where: { id } });
        if (!story)
            throw new common_1.NotFoundException('Story not found');
        if (story.userId !== user.id && user.role !== 'ADMIN')
            throw new common_1.ForbiddenException('Access denied');
        return this.prisma.story.update({
            where: { id },
            data: {
                ...dto,
                travelDate: dto.travelDate ? new Date(dto.travelDate) : undefined,
            },
            select: storySelect,
        });
    }
    async remove(id, user) {
        const story = await this.prisma.story.findUnique({ where: { id } });
        if (!story)
            throw new common_1.NotFoundException('Story not found');
        if (story.userId !== user.id && user.role !== 'ADMIN')
            throw new common_1.ForbiddenException('Access denied');
        await this.prisma.story.delete({ where: { id } });
        return { message: 'Story deleted successfully' };
    }
};
exports.StoriesService = StoriesService;
exports.StoriesService = StoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StoriesService);
//# sourceMappingURL=stories.service.js.map