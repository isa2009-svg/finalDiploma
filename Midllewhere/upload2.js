// middleware/upload.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/uploads2/');  // Файлдар сақталатын бума
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Файл атын өзгерту
  }
});

const upload = multer({ storage });
module.exports = upload;  // Multer объектісін экспорттау