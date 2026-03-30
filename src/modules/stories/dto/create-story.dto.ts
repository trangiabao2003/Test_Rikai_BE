import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateStoryDto {
  @IsString()
  title!: string;

  @IsString()
  content!: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsDateString()
  travelDate?: string;
}
