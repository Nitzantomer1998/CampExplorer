import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'CampExplorer',
    allowedFormats: ['jpeg', 'jpg', 'png'],
    transformation: [{ width: 500, height: 300, fit: 'scale' }],
    maxFileSize: 6000000,
  },
});

export { cloudinary, cloudinaryStorage };
