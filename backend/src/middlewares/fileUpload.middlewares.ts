import multer from 'multer';

export const storage = multer.diskStorage({
  destination: 'src/uploads',
  filename: (req:any, file:any, cb:any) => {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});
 