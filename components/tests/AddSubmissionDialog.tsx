import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { OperationContext, useMutation } from "urql";
import { CreateSubmissionDocument } from "../../gql/generated/graphql";

interface Props {
  assignmentID: string;
  open?: boolean;
  toggleOpen(): void;
  onClose(): void;
  // eslint-disable-next-line no-unused-vars
  reexecuteQuery(opts?: Partial<OperationContext> | undefined): void;
}

const AddSubmissionDialog: React.FC<Props> = ({
  assignmentID,
  open,
  toggleOpen,
  onClose,
  reexecuteQuery,
}) => {
  // Set the AWS Region
  const REGION = "ap-southeast-2";
  const UPLOADS_BUCKET_NAME = "uploads-76078f4";

  const [, createSubmission] = useMutation(CreateSubmissionDocument);
  const [newSubmissionStudentID, setNewSubmissionStudentID] = useState("");

  // Initialize the Amazon Cognito credentials provider
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

  const handleAddSubmission = async () => {
    if (!assignmentID || typeof assignmentID !== "string") {
      alert("No assignment ID");
      return;
    }

    await createSubmission({
      submission: {
        assignmentID,
        studentID: newSubmissionStudentID,
      },
    });
    reexecuteQuery({ requestPolicy: "network-only" });

    toggleOpen();
  };

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

    const uploadParams = {
      Bucket: UPLOADS_BUCKET_NAME,
      Key: `projects/${assignmentID}/${newSubmissionStudentID}/Main.java`,
      Body: uploadedFile,
    };

    try {
      await s3.send(new PutObjectCommand(uploadParams));
      alert("Successfully uploaded file.");
    } catch (err: any) {
      return alert("There was an error uploading your file: " + err.message);
    }
  };

  return (
    <Dialog
      open={open || false}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="form-dialog-title">
        Add a Submission for this Assignment
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the submission&apos;s details.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Student ID"
          type="text"
          fullWidth
          onChange={(e) => setNewSubmissionStudentID(e.target.value)}
        />

        <Button variant="contained" component="label">
          Choose File
          <input id="fileupload" type="file" hidden />
        </Button>
        <Button variant="contained" component="label" onClick={uploadFile}>
          Upload File
        </Button>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={toggleOpen}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleAddSubmission}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSubmissionDialog;
