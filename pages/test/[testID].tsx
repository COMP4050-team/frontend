import type { NextPage } from "next";
import { useQuery } from "urql";
import { GetTestDocument } from "../../gql/generated/graphql";
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
  const [result] = useQuery({
    query: GetTestDocument,
    variables: { id: testID as string },
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

    if (!result.data?.test) {
      alert("Could not upload file");
      return;
    }

    console.log(result.data.test);

    const uploadParams = {
      Bucket: UPLOADS_BUCKET_NAME,
      // TODO: Fix this - result.data.test.assignmentID is always empty
      Key: `tests/${result.data.test.assignmentID}/${
        testID as string
      }/Test.java`,
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
        Prefix: `tests/${result.data?.test?.assignmentID}}/${testID}/`,
      };

      try {
        const data = await s3Service.send(new ListObjectsCommand(listParams));

        setFiles(data.Contents?.map((obj) => obj.Key || "") || []);
      } catch (err: any) {
        return alert("There was an error listing your files: " + err.message);
      }
    })();
  }, [result.data?.test?.assignmentID, testID]);

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  return (
    <>
      <Typography align="center" variant="h3">
        {result.data?.test?.name}
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

      {result.data?.test?.assignmentID && (
        <TestTable assignmentID={result.data?.test?.assignmentID} />
      )}
    </>
  );
};

export default TestPage;
