import { Button } from "@mui/material";
import { useMemo } from "react";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

function TestDetails() {
  const REGION = "ap-southeast-2";
  const UPLOADS_BUCKET_NAME = "uploads-76078f4";

  const s3 = useMemo(
    () =>
      new S3Client({
        region: REGION,
        credentials: fromCognitoIdentityPool({
          client: new CognitoIdentityClient({ region: REGION }),
          identityPoolId: "ap-southeast-2:46ec7d87-6d8a-494f-a5c0-f067f9c45e0b", // IDENTITY_POOL_ID
        }),
      }),
    []
  );

  const downloadFile = async () => {
    try {
      const response = await s3.send(
        new GetObjectCommand({
          Bucket: UPLOADS_BUCKET_NAME,
          Key: "tests/data.json",
        })
      );

      const body = response.Body as ReadableStream<any> | Blob | undefined;
      const json = await new Response(body).json();

      console.log(json);
    } catch (err: any) {
      return alert("There was an error downloading your file: " + err.message);
    }
  };

  // const payload = await streamToString(getObjectResponse.Body)

  //TODO: Create an add function that adds any new tests

  return (
    <div className="container">
      <Button
        onClick={() => {
          downloadFile();
        }}
      >
        Get Details
      </Button>
    </div>
  );
}

export default TestDetails;
