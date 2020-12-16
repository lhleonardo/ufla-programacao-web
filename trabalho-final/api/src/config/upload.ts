import multer, { Options } from 'multer';
import path from 'path';

import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  destination: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, filename, callback) {
      const hash = crypto.randomBytes(10).toString('hex');

      const hashedFilename = `${hash}-${filename.originalname}`;

      return callback(null, hashedFilename);
    },
  }),
} as Options;
