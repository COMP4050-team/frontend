import type { NextPage } from "next";
import { useMutation, useQuery } from "urql";
import {
  GetAssignmentDocument,
  GetTestDocument,
  GetUnitDocument,
  RunTestDocument,
} from "../../gql/generated/graphql";
import { useRouter } from "next/router";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { ListObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { CustomList } from "../../components/CustomList";
import { useCallback, useEffect, useState } from "react";
import { downloadFile, IS3DataResult, s3Service } from "../../services/s3";
import { setNodes } from "../../state/features/navbar/navbarSlice";
import { useDispatch } from "react-redux";
import StudentTestResult from "../../components/tests/StudentTestResult";

const TestPage: NextPage = () => {
  const router = useRouter();
  const { testID } = router.query;
  const [testResult] = useQuery({
    query: GetTestDocument,
    variables: { id: testID as string },
  });
  const [assignmentResult] = useQuery({
    query: GetAssignmentDocument,
    variables: { id: testResult.data?.test?.assignment.id || "" },
  });
  const [unitResult] = useQuery({
    query: GetUnitDocument,
    variables: { id: testResult.data?.test?.unit.id || "" },
  });
  const [runTestState, runTest] = useMutation(RunTestDocument);
  const [files, setFiles] = useState<string[] | undefined>([]);
  const [resultRows, setResultRows] = useState<IS3DataResult[]>();
  const [checkingS3, setCheckingS3] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (testResult?.data?.test) {
      dispatch(
        setNodes([
          { value: "ProTest", href: "/" },
          {
            value: testResult.data.test.unit.name,
            href: `/unit/${testResult.data.test.unit.id}`,
          },
          {
            value: testResult.data.test.class.name,
            href: `/class/${testResult.data.test.class.id}`,
          },
          {
            value: testResult.data.test.assignment.name,
            href: `/assignment/${testResult.data.test.assignment.id}`,
          },
          {
            value: testResult.data.test.name,
            href: `/test/${testResult.data.test.id}`,
          },
        ])
      );
    }
  }, [dispatch, testResult.data?.test]);

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
      Key: `${unitResult.data?.unit?.name}/${assignmentResult.data?.assignment?.name}/Tests/${testResult.data.test.id}/Test.java`,
      Body: uploadedFile,
    };

    try {
      await s3Service.send(new PutObjectCommand(uploadParams));
      console.log("Successfully uploaded file.");

      await updateFileListing();
    } catch (err: any) {
      return alert("There was an error uploading your file: " + err.message);
    }
  };

  const updateFileListing = useCallback(async () => {
    const listParams = {
      Bucket: UPLOADS_BUCKET_NAME,
      Prefix: `${unitResult.data?.unit?.name}/${assignmentResult.data?.assignment?.name}/Tests/`,
    };

    try {
      const data = await s3Service.send(new ListObjectsCommand(listParams));

      setFiles(data.Contents?.map((obj) => obj.Key || "") || []);
    } catch (err: any) {
      console.log("There was an error listing your files: " + err.message);
    }
  }, [assignmentResult.data?.assignment?.name, unitResult.data?.unit?.name]);

  const downloadResultsFile = useCallback(
    async (intervalID: NodeJS.Timer | null) => {
      if (runTestState.fetching) {
        return;
      }

      const unitName = unitResult.data?.unit?.name;
      const assignmentName = assignmentResult.data?.assignment?.name;

      if (unitName && assignmentName) {
        const data = await downloadFile(
          `${unitName}/${assignmentName}/Results/result.json`
        );
        if (data !== null) {
          setResultRows(data.results);
          setCheckingS3(false);

          if (intervalID) {
            clearInterval(intervalID);
          }
        }
      }
    },
    [
      unitResult.data?.unit?.name,
      assignmentResult.data?.assignment?.name,
      runTestState.fetching,
    ]
  );

  useEffect(() => {
    (async () => {
      await updateFileListing();
      await downloadResultsFile(null);
    })();
  }, [updateFileListing, downloadResultsFile]);

  if (testResult.fetching || unitResult.fetching || assignmentResult.fetching)
    return <p>Loading...</p>;
  if (testResult.error || unitResult.error || assignmentResult.error)
    return <p>Error :(</p>;

  return (
    <>
      <Typography align="center" variant="h3">
        {testResult.data?.test?.name}
      </Typography>
      <div
        style={{
          display: "grid",
          maxWidth: "fit-content",
          gridTemplateColumns: "repeat(3, 1fr)",
          margin: "1rem",
          gap: "2rem",
        }}
      >
        <Button variant="contained" component="label">
          Choose File
          <input id="fileupload" type="file" hidden />
        </Button>
        <Button variant="contained" component="label" onClick={uploadFile}>
          Upload File
        </Button>
        {/* Show a spinner */}
        <Box display="flex">
          <Button
            style={{ marginRight: "1rem" }}
            variant="contained"
            component="label"
            onClick={() => {
              setCheckingS3(true);

              runTest({ testID: testID as string }).then(() => {
                // Try to download the results file every 5 seconds
                let intervalID = setInterval(() => {
                  downloadResultsFile(intervalID);
                }, 5000);
              });
            }}
          >
            Run Test
          </Button>
          {checkingS3 && <CircularProgress />}
        </Box>
      </div>
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

      {resultRows?.map((row) => (
        <StudentTestResult key={row.student_id} testResult={row} />
      ))}
    </>
  );
};

export default TestPage;
