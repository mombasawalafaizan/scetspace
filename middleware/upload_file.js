// FOR LOCAL STORAGE
const multer = require('multer');
const path = require('path');
require('dotenv').config();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        let x = file.originalname.trim();
        const ext = x.substring(x.lastIndexOf('.') + 1);
        const filename = x.substring(0, x.lastIndexOf('.')).replace(/[@$%&:*\/?"'<>|~`#^+={}[\];!\\]/g, "");
        cb(null, `admin-${filename}-${Date.now()}.${ext}`);
    }
});

let fileFilter = (req, file, cb) => {
    // Allowed ext
    const filetypes = /pdf/;

    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        req.fileValidationError = 'Only pdf file is supported ';
        return cb(new Error("Unsupported file types"), false);
    }
};

module.exports = multer({ storage: storage, limits: { fileSize: 10000000 }, fileFilter: fileFilter }).single('file');