import multer from 'multer';
import fs from 'fs';
import path from 'path';

export const fileUploader = (uploadPath: string) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const fullPath = path.join(process.cwd(), 'uploads', uploadPath);

      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }

      cb(null, fullPath);
    },

    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  return multer({ storage });
};
