
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

export function uploadToCloudinary(buffer, folder = "users") {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image",
                transformation: [
                    { width: 500, height: 500, crop: "limit" },
                    { quality: "auto", fetch_format: "auto" }
                ]
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
}
