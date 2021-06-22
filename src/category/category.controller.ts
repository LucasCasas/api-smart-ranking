import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { Category } from './infrastructure/category.interface';
import { CategoryParameterValidatorPipe } from './pipe/category-parameter-validator.pipe';

@Controller('api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async add(@Body() categoryDto: CategoryDto): Promise<Category> {
    return await this.categoryService.add(categoryDto);
  }

  @Post('/:category/player/:playerId')
  async addPlayers(@Param() params: string[]): Promise<void> {
    return this.categoryService.addPlayers(params);
  }

  @Put('/:category')
  @UsePipes(ValidationPipe)
  async edit(
    @Body() categoryDto: CategoryDto,
    @Param('category', CategoryParameterValidatorPipe) category: string,
  ): Promise<Category> {
    return await this.categoryService.edit(category, categoryDto);
  }

  @Get('/:id')
  async get(
    @Param('id', CategoryParameterValidatorPipe) id: string,
  ): Promise<Category> {
    return await this.categoryService.getById(id);
  }

  @Get()
  async getAll(): Promise<Category[]> {
    return await this.categoryService.getAll();
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    this.categoryService.delete(id);
  }
}
