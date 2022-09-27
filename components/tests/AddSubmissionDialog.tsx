import { PutObjectCommand } from "@aws-sdk/client-s3";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { OperationContext, useMutation, useQuery } from "urql";
import {
  CreateSubmissionDocument,
  GetUnitDocument,
} from "../../gql/generated/graphql";
import { s3Service } from "../../services/s3";

interface Props {
  assignmentID: string;
  assignmentName: string;
  unitID: string;
  open?: boolean;
  onClose(): void;
  // eslint-disable-next-line no-unused-vars
  reexecuteQuery(opts?: Partial<OperationContext> | undefined): void;
}

const AddSubmissionDialog: React.FC<Props> = ({
  assignmentID,
  assignmentName,
  unitID,
  open,
  onClose,
  reexecuteQuery,
}) => {
  // Set the AWS Region
  const UPLOADS_BUCKET_NAME = "uploads-76078f4";

  const [, createSubmission] = useMutation(CreateSubmissionDocument);
  const [newSubmissionStudentID, setNewSubmissionStudentID] = useState("");
  const [unitResult] = useQuery({
    query: GetUnitDocument,
    variables: { id: unitID },
  });

  const handleAddSubmission = async () => {
    await uploadFile();

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

    onClose();
  };

  const uploadFile = async () => {
    const fileUpload = document.getElementById(
      "fileupload"
    ) as HTMLInputElement;

    if (!fileUpload.files) {
      alert("No file selected");
      return;
    }

    for (const file of fileUpload.files) {
      const relativePath = file.webkitRelativePath;

      const uploadParams = {
        Bucket: UPLOADS_BUCKET_NAME,
        Key: `${unitResult.data?.unit?.name}/${assignmentName}/Projects/${relativePath}`,
        Body: file,
      };

      try {
        await s3Service.send(new PutObjectCommand(uploadParams));
      } catch (err: any) {
        return alert("There was an error uploading your file: " + err.message);
      }
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
          <input
            id="fileupload"
            type="file"
            // @ts-ignore-next-line
            // eslint-disable-next-line react/no-unknown-property
            directory=""
            // eslint-disable-next-line react/no-unknown-property
            webkitdirectory=""
            hidden
          />
        </Button>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
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
