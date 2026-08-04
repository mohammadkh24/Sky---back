import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { generateUniqueId } from 'src/common/utils/uniqueId.util';
import { userMessages } from 'src/common/enums/messages.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const { username, password } = dto;

    const userExists = await this.userRepo.findOneBy({ username });

    if (userExists) throw new ConflictException('');

    const hashedPassword = await bcrypt.hash(password, 10);

    const uniqueId = await generateUniqueId(this.userRepo);

    const user = this.userRepo.create({
      id: uniqueId,
      username,
      password: hashedPassword,
    });

    await this.userRepo.save(user);

    return {
      message: userMessages.USER_CREATED_SUCCESS,
    };
  }

  async findAll() {
    const users = await this.userRepo.find({});

    return {
      data: users,
    };
  }

  async findByUsername(username: string) {
    const user = this.userRepo.findOne({
      where: {
        username,
      },
    });

    return {
      data: user,
    };
  }

  async findByUsernameWithPassword(username: string) {
    return this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username = :username', { username })
      .getOne();
  }
}
