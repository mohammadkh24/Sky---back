import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import {
  editFileName,
  imageFileFilter,
} from '../utils/multer.util';

import { UploadConstants } from '../constants/upload.constant';

export const UploadImagesInterceptor = () =>
  FilesInterceptor(
    'images',
    UploadConstants.MAX_IMAGES_COUNT,
    {
      storage: diskStorage({
        destination:
          UploadConstants.PROPERTY_DESTINATION,

        filename: editFileName,
      }),

      fileFilter: imageFileFilter,

      limits: {
        fileSize:
          UploadConstants.MAX_FILE_SIZE,
      },
    },
  );