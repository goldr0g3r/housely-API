import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AccessTokenGuard } from 'src/common/helpers/guards/accessToken.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateCategoryRequest } from './dto/request/CreateCategory.dto';
import { AllowRoles } from 'src/common/helpers/decorators/role.decorator';
import { Roles } from 'src/common/interface/auth/enum/Roles';
import { Request } from 'express';
@UseGuards(AccessTokenGuard)
@ApiBearerAuth('accessToken')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth('accessToken')
  @UseGuards(AccessTokenGuard)
  //@AllowRoles([Roles.ADMIN, Roles.AGENT])
  @Post('new')
  async createCategory(
    @Req() request: Request,
    @Body() body: CreateCategoryRequest,
  ) {
    console.log('request', request.user);
    if (!request.user) throw new UnauthorizedException('You need to login');
    return await this.categoryService.createCategory(body);
  }
}
