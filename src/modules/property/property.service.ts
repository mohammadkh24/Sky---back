import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { generateUniqueId } from 'src/common/utils/uniqueId.util';
import { propertyMessages } from 'src/common/enums/messages.enum';
import { FilterPropertyDto } from './dto/filter-property.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepo: Repository<Property>,
    private configService: ConfigService

  ) {}

  async create(dto: CreatePropertyDto, files: Express.Multer.File[]) {
    const {
      area,
      bedrooms,
      isVip,
      location,
      price,
      title,
      description,
      facilities,
      type
    } = dto;

    if (!files || files.length === 0) {
      throw new BadRequestException('حداقل یک تصویر برای ملک ارسال کنید');
    }

    const uniqueId = await generateUniqueId(this.propertyRepo);

    const appUrl = this.configService.get<string>('app.url');

    const images = files.map(
      (file) => `${appUrl}/uploads/properties/${file.filename}`,
    );
    const property = this.propertyRepo.create({
      id: uniqueId,
      area,
      bedrooms,
      isVip,
      location,
      price,
      title,
      description,
      facilities,
      type,
      images,
    });

    await this.propertyRepo.save(property);

    return {
      message: propertyMessages.PROPERTY_CREATED_SUCCESS,
    };
  }

  async findAll(
    filterDto: FilterPropertyDto,
  ) {
  
    const {
      city,
      type,
      maxPrice,
      minArea,
    } = filterDto;
  
  
    const query =
      this.propertyRepo
        .createQueryBuilder('property');
  
  
    if(city){
      query.andWhere(
        'property.location LIKE :city',
        {
          city: `%${city}%`,
        },
      );
    }
  
  
    if(type){
      query.andWhere(
        'property.type = :type',
        {
          type,
        },
      );
    }
  
  
    if(maxPrice){
      query.andWhere(
        'property.price <= :maxPrice',
        {
          maxPrice,
        },
      );
    }
  
  
    if(minArea){
      query.andWhere(
        'property.area >= :minArea',
        {
          minArea,
        },
      );
    }
  
  
    const properties =
      await query
        .orderBy(
          'property.createdAt',
          'DESC',
        )
        .getMany();
  
  
    return {
      data: properties,
    };
  }

  async findOne(id: number) {
    const property = await this.propertyRepo.findOne({
      where: { id },
    });

    if (!property)
      throw new NotFoundException(propertyMessages.PROPERTY_NOT_FOUND);

    return {
      data: property,
    };
  }

  async update(id: number, dto: UpdatePropertyDto) {
    const {
      area,
      bedrooms,
      description,
      facilities,
      isVip,
      location,
      price,
      title,
      type
    } = dto;
    const property = await this.propertyRepo.findOne({
      where: { id },
    });

    if (!property)
      throw new NotFoundException(propertyMessages.PROPERTY_NOT_FOUND);

    property.area = area ?? property.area;
    property.bedrooms = bedrooms ?? property.bedrooms;
    property.description = description ?? property.description;
    property.facilities = facilities ?? property.facilities;
    property.isVip = isVip ?? property.isVip;
    property.location = location ?? property.location;
    property.price = price ?? property.price;
    property.title = title ?? property.title;
    property.type = type ?? property.type;

    await this.propertyRepo.save(property);

    return {
      message: propertyMessages.PROPERTY_UPDATED_SUCCESS,
    };
  }

  async remove(id: number) {
    const property = await this.propertyRepo.findOne({
      where: { id },
    });

    if (!property)
      throw new NotFoundException(propertyMessages.PROPERTY_NOT_FOUND);

    await this.propertyRepo.remove(property);

    return {
      message: propertyMessages.PROPERTY_REMOVED_SUCCESS,
    };
  }
}
