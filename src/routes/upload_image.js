const multer = require('multer');

const storageImage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, callBack) => {
    callBack(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadImage = multer({
  storage: storageImage,
});

module.exports = uploadImage;
