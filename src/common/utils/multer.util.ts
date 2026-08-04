import { randomUUID } from 'crypto';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';

export const editFileName = (
  req: any,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
) => {
  const extension = extname(file.originalname);

  callback(
    null,
    `${randomUUID()}${extension}`,
  );
};

export const imageFileFilter = (
  req: any,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.mimetype.startsWith('image/')) {
    return callback(
      new BadRequestException(
        'Only image files are allowed.',
      ),
      false,
    );
  }

  callback(null, true);
};