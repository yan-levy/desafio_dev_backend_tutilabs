import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const multerConfig = {
  dest: process.env.UPLOAD_LOCATION,
};

export const multerOptions = {
  fileFilter: (req, file: any, cb) => {
    cb(null, true);
    // console.log({ file: file });

    // console.log(file.mimetype.match(/\/(pdf|txt)$/));

    if (file.mimetype.match(/\/(pdf|txt)$/)) {
    } else {
      cb(
        new HttpException(
          `Unsupported file type: ${extname(
            file.originalname,
          )}. Please, upload: txt, or pdf file`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination(req, file, cb) {
      const uploadPath = multerConfig.dest;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename(req, file, cb) {
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};
