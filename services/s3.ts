import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { Readable } from "stream";

const REGION = "ap-southeast-2";
const UPLOADS_BUCKET_NAME = "uploads-76078f4";

export const s3Service = new S3Client({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: "ap-southeast-2:46ec7d87-6d8a-494f-a5c0-f067f9c45e0b", // IDENTITY_POOL_ID
  }),
});

export interface IS3Data {
  results: IS3DataResult[];
}

export type IS3DataColumns = {
  field: string;
  headerName: string;
  width: number;
}[];
export type IS3DataResult = {
  student_id: string;
  student_name: string;
  tests: {
    name: string;
    passed: boolean;
    message: string;
  }[];
};

export const downloadFile = async (s3Key: string): Promise<IS3Data | null> => {
  try {
    const response = await s3Service.send(
      new GetObjectCommand({
        Bucket: UPLOADS_BUCKET_NAME,
        Key: s3Key,
      })
    );

    const body = response.Body;
    if (!(body instanceof Readable)) {
      return await new Response(body).json();
    }
  } catch (err: any) {
    console.log("There was an error downloading your file: " + err.message);
  }

  return null;
};
