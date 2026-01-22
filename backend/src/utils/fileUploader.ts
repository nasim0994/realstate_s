import multer from 'multer';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const fileUploader = (uploadPath: string) => {
  const storage = multer.memoryStorage();

  const upload = multer({ storage });

  const uploadAndConvert = async (req: any, res: any, next: any) => {
    try {
      const fullPath = path.join(process.cwd(), 'uploads', uploadPath);

      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }

      // 🔹 Case 1: single()
      if (req.file) {
        const file = req.file;

        const fileName =
          Date.now() + '-' + path.parse(file.originalname).name + '.webp';

        const outputPath = path.join(fullPath, fileName);

        await sharp(file.buffer).webp({ quality: 80 }).toFile(outputPath);

        req.file = {
          ...file,
          filename: fileName,
          path: outputPath,
          mimetype: 'image/webp',
        };

        return next();
      }

      // 🔹 Case 2: fields() / array()
      if (req.files && Object.keys(req.files).length) {
        const files: any = {};

        for (const fieldName in req.files) {
          const fieldFiles = req.files[fieldName];

          files[fieldName] = [];

          for (const file of fieldFiles) {
            const fileName =
              Date.now() + '-' + path.parse(file.originalname).name + '.webp';

            const outputPath = path.join(fullPath, fileName);

            await sharp(file.buffer).webp({ quality: 80 }).toFile(outputPath);

            files[fieldName].push({
              ...file,
              filename: fileName,
              path: outputPath,
              mimetype: 'image/webp',
            });
          }
        }

        req.files = files;
      }

      next();
    } catch (err) {
      next(err);
    }
  };

  return { upload, uploadAndConvert };
};
