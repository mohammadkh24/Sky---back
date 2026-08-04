import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadImagesInterceptor } from 'src/common/interceptors/upload-images.interceptor';
import { FilterPropertyDto } from './dto/filter-property.dto';
import { AuthGuard } from '../../common/guards/auth.guard';

@ApiTags('Properties')
@Controller('properties')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        isVip: {
          type: 'boolean',
        },

        title: {
          type: 'string',
        },

        price: {
          type: 'number',
        },

        location: {
          type: 'string',
        },

        area: {
          type: 'number',
        },

        bedrooms: {
          type: 'number',
        },

        description: {
          type: 'string',
        },

        facilities: {
          type: 'string',
          example: '["پارکینگ","آسانسور"]',
        },
        type: {
          type: 'string',
          example: 'آپارتمان',
        },

        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(UploadImagesInterceptor())
  create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: CreatePropertyDto,
  ) {
    return this.propertyService.create(dto, files);
  }

  @Get()
  findAll(@Query() filterDto: FilterPropertyDto) {
    return this.propertyService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get property by id' })
  findOne(@Param('id') id: number) {
    return this.propertyService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update property' })
  update(@Param('id') id: number, @Body() dto: UpdatePropertyDto) {
    return this.propertyService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete property' })
  remove(@Param('id') id: number) {
    return this.propertyService.remove(+id);
  }
}
