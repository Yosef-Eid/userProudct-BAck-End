import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination path for the uploaded files
        cb(null, path.join(__dirname, '../images'));
    },
    filename: function (req, file, cb) {
        // Set the filename for the uploaded file
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext).replace(/\s/g, '-');
        cb(null, `${name}-${Date.now()}${ext}`);
    }
});

 //Multer middleware instance
export const upload = multer({ storage });

