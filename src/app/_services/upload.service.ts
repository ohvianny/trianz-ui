import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    fileUpload(file: File, filename: string) {
        const contentType = file.type;

        const bucket = new S3({
            accessKeyId: 'AKIAYPIVBHA5LOLTE3M5',
            secretAccessKey: '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',
            region: 'sa-east-1',
        });
        const params = {
            Bucket: 'clubtrianz',
            Key: filename + ".jpg",
            Body: file,
            ACL: 'public-read',
            ContentType: contentType
        };
        bucket.upload(params, function (err, data) {
            if (err) {
                console.log('EROOR: ', JSON.stringify(err));
                return false;
            }
            console.log('File Uploaded.', data);
            return true;
        });
    }

}