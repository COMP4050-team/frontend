import { Button } from "@mui/material";
import { useMemo } from "react";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

// const command = new GetObjectCommand(input);
// const response = await client.send(command);

function TestDetails() {
  // const [getData, setData] = useState([]);
  // const [template, setTemplate] = useState('Choose Template')

  const REGION = "ap-southeast-2";
  const UPLOADS_BUCKET_NAME = "uploads-76078f4";

  // const client = new S3Client({region: "ap-southeast-2"});

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
    // let responseDataChunks = []
    try {
      const response = await s3.send(
        new GetObjectCommand({
          Bucket: UPLOADS_BUCKET_NAME,
          Key: "tests/Tests.java",
        })
      );

      console.log(response.ContentType);

      const reader = new FileReader();
      // if(response.Body !== undefined){
      //   let blob = new Blob([response.Body] {type: response.ContentType});

      //   reader.readAsText(response.Body);
      // }
      console.log(typeof reader);
    } catch (err: any) {
      return alert("There was an error downloading your file: " + err.message);
    }
  };

  return (
    <div className="container">
      <Button
        onClick={() => {
          downloadFile;
        }}
      >
        Download
      </Button>
    </div>
  );
}

export default TestDetails;
