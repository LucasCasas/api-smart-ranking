import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { Category } from './infrastructure/category.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayerService } from 'src/player/player.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly playerService: PlayerService,
  ) {}

  async add(categoryDto: CategoryDto): Promise<Category> {
    const { category } = categoryDto;
    const categoryDB = await this.categoryModel.findOne({ category }).exec();

    if (categoryDB) {
      new BadRequestException(`Category ${category} already exists!`);
    }

    const newCategory = new this.categoryModel(categoryDto);
    return newCategory.save();
  }

  async edit(_id: string, categoryDto: CategoryDto): Promise<Category> {
    const categoryDB = await this.categoryModel.findOne({ _id }).exec();

    if (!categoryDB) {
      throw new NotFoundException(`Category not found!`);
    } else if (categoryDB.category !== categoryDto.category) {
      throw new BadRequestException(
        `Category name cannot be updated! (${categoryDto.category})`,
      );
    }

    return await this.categoryModel
      .findOneAndUpdate({ _id }, { $set: categoryDto })
      .exec();
  }

  async addPlayers(params: string[]): Promise<void> {
    const categoryId = params['category'];
    const playerId = params['playerId'];

    const categoryDB = await this.categoryModel
      .findOne({ _id: categoryId })
      .exec();

    if (!categoryDB) {
      throw new BadRequestException(`Category not found!`);
    }
    console.log(categoryDB.players);
    const existsPlayer = categoryDB.players.some(
      (player) => player == playerId,
    );

    console.log(existsPlayer);

    if (existsPlayer) {
      throw new BadRequestException(
        `Player ${playerId} already belongs to this category!`,
      );
    }
    const playerDB = await this.playerService.getById(playerId);

    console.log(2);
    if (!playerDB) {
      throw new BadRequestException(`Player ${playerId} not found!`);
    }
    console.log(3);

    categoryDB.players.push(playerDB);
    console.log(4);

    await this.categoryModel.findOneAndUpdate(
      { _id: categoryId },
      { $set: categoryDB },
    );
  }

  async getAll(): Promise<Category[]> {
    return this.categoryModel.find().populate('player').exec();
  }

  async getById(_id: string): Promise<Category> {
    const category = await this.categoryModel.findOne({ _id }).exec();
    if (!category) {
      throw new NotFoundException(`Category not found (${_id})`);
    }
    return category;
  }

  async delete(_id: string): Promise<any> {
    return await this.categoryModel.deleteOne({ _id });
  }
}
