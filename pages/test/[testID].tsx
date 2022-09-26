import type { NextPage } from "next";
import { useQuery } from "urql";
import {
  GetAssignmentDocument,
  GetTestDocument,
  GetUnitDocument,
} from "../../gql/generated/graphql";
import { useRouter } from "next/router";
import { Button, Typography } from "@mui/material";
import { ListObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { CustomList } from "../../components/CustomList";
import { useEffect, useState } from "react";
import TestTable from "../../components/tests/TestTable";
import { s3Service } from "../../services/s3";

const TestPage: NextPage = () => {
  const router = useRouter();
  const { testID } = router.query;
  const [testResult] = useQuery({
    query: GetTestDocument,
    variables: { id: testID as string },
  });
  const [assignmentResult] = useQuery({
    query: GetAssignmentDocument,
    variables: { id: testResult.data?.test?.assignmentID || "" },
  });
  const [unitResult] = useQuery({
    query: GetUnitDocument,
    variables: { id: testResult.data?.test?.unitID || "" },
  });
  const [files, setFiles] = useState<string[] | undefined>([]);

  // Set the AWS Region
  const UPLOADS_BUCKET_NAME = "uploads-76078f4";

  const uploadFile = async () => {
    const fileUpload = document.getElementById(
      "fileupload"
    ) as HTMLInputElement;

    const uploadedFile = fileUpload.files ? fileUpload.files[0] : null;
    console.log(uploadedFile);

    if (!uploadedFile) {
      alert("No file selected");
      return;
    }

    if (!testResult.data?.test) {
      alert("Could not upload file");
      return;
    }

    console.log(testResult.data.test);

    const uploadParams = {
      Bucket: UPLOADS_BUCKET_NAME,
      Key: `${unitResult.data?.unit?.name}/${assignmentResult.data?.assignment?.name}/Tests/Test.java`,
      Body: uploadedFile,
    };

    try {
      await s3Service.send(new PutObjectCommand(uploadParams));
      alert("Successfully uploaded file.");
    } catch (err: any) {
      return alert("There was an error uploading your file: " + err.message);
    }
  };

  useEffect(() => {
    (async () => {
      const listParams = {
        Bucket: UPLOADS_BUCKET_NAME,
        Prefix: `${unitResult.data?.unit?.name}/${assignmentResult.data?.assignment?.name}/Tests/`,
      };

      try {
        const data = await s3Service.send(new ListObjectsCommand(listParams));

        setFiles(data.Contents?.map((obj) => obj.Key || "") || []);
      } catch (err: any) {
        return alert("There was an error listing your files: " + err.message);
      }
    })();
  }, [
    testID,
    unitResult.data?.unit?.name,
    assignmentResult.data?.assignment?.name,
  ]);

  if (testResult.fetching || unitResult.fetching || assignmentResult.fetching)
    return <p>Loading...</p>;
  if (testResult.error || unitResult.error || assignmentResult.error)
    return <p>Error :(</p>;

  return (
    <>
      <Typography align="center" variant="h3">
        {testResult.data?.test?.name}
      </Typography>

      <Button variant="contained" component="label">
        Choose File
        <input id="fileupload" type="file" hidden />
      </Button>
      <Button variant="contained" component="label" onClick={uploadFile}>
        Upload File
      </Button>

      <CustomList
        items={
          files?.map((file) => {
            return {
              text: file,
              href: ``,
            };
          }) ?? []
        }
      />

      {testResult.data?.test?.assignmentID && (
        <TestTable assignmentID={testResult.data?.test?.assignmentID} />
      )}
    </>
  );
};

export default TestPage;
