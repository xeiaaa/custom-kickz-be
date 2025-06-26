import { IsNotEmpty, IsOptional, IsString, IsObject } from 'class-validator';

export class CreateColorwayDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsObject()
  materialMap: Record<string, string>;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsNotEmpty()
  @IsString()
  silhouetteId: string;
}
