import { IsOptional, IsString, IsObject } from 'class-validator';

export class UpdateColorwayDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsObject()
  materialMap?: Record<string, string>;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  silhouetteId?: string;
}
