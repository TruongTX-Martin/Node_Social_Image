import database from '../../models/index';
import Resize from './middleware/ResizeImage';
import path from 'path';
import {
    responseError,
} from '../utils';

const uploadImage = async (req, res) => {
    const imagePath = path.join(process.cwd(), '/public/images');
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
      res.send(responseError(false, null, 'Please provide an image'));
    }
    const filename = await fileUpload.save(req.file.buffer);
    return res.status(200).json({ name: filename });
}

const imageRepository = {
    uploadImage,
}

export default imageRepository;


