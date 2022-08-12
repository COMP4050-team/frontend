import type { NextPage } from 'next';

import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Set the AWS Region
const REGION = 'ap-southeast-2'; //REGION

// Initialize the Amazon Cognito credentials provider
const s3 = new S3Client({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: 'ap-southeast-2:46ec7d87-6d8a-494f-a5c0-f067f9c45e0b', // IDENTITY_POOL_ID
  }),
});

const uploadsBucketName = 'uploads-76078f4'; //BUCKET_NAME

// A page that lets the user upload a text file to S3.
const UploadTest: NextPage = () => {
  const uploadFile = async () => {
    const fileUpload = document.getElementById(
      'fileupload',
    ) as HTMLInputElement;

    const uploadedFile = fileUpload.files ? fileUpload.files[0] : null;
    console.log(uploadedFile);

    if (!uploadedFile) {
      alert('No file selected');
      return;
    }

    const uploadParams = {
      Bucket: uploadsBucketName,
      Key: uploadedFile.name,
      Body: uploadedFile,
    };

    try {
      await s3.send(new PutObjectCommand(uploadParams));
      alert('Successfully uploaded file.');
    } catch (err: any) {
      return alert('There was an error uploading your file: ' + err.message);
    }
  };

  return (
    <div>
      <input id='fileupload' type='file' name='fileupload' />
      <button id='upload-button' onClick={uploadFile}>
        {' '}
        Upload{' '}
      </button>
    </div>
  );
};

export default UploadTest;
