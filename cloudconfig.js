
const cloudinary = require('cloudinary');
const CloudinaryStorage  = require('multer-storage-cloudinary');

cloudinary.config({
   secure: true
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wonderlust_DEV',
    allowedFormats:["jpg","png","jpeg"]
  }
});

module.exports ={
    cloudinary,
    storage
}

