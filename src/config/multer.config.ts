import multer from 'multer';

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max size
    fileFilter(req, file, callback) {
        
        const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/webp'];

        if (!allowedMimeTypes.includes(file.mimetype)) {
            return callback(new Error('Can only accept PNG, JPEG, and WEBP files.'));
        }
        callback(null, true);
    },
});
