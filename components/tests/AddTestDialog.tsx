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
import { OperationContext, useMutation } from "urql";
import { CreateTestDocument } from "../../gql/generated/graphql";

interface Props {
  assignmentID: string;
  open?: boolean;
  toggleOpen(): void;
  onClose(): void;
  // eslint-disable-next-line no-unused-vars
  reexecuteQuery(opts?: Partial<OperationContext> | undefined): void;
}

const AddTestDialog: React.FC<Props> = ({
  assignmentID,
  open,
  toggleOpen,
  onClose,
  reexecuteQuery,
}) => {
  const [createTestResult, createTest] = useMutation(CreateTestDocument);
  const [newTestName, setNewTestName] = useState("");

  const handleAddTest = async () => {
    if (!assignmentID || typeof assignmentID !== "string") {
      alert("No assignment ID");
      return;
    }

    await createTest({
      test: {
        name: newTestName,
        assignmentID,
        storagePath: `tests/${createTestResult.data?.createTest.assignmentID}/${createTestResult.data?.createTest.id}/${newTestName}`,
      },
    });
    await reexecuteQuery({ requestPolicy: "network-only" });

    toggleOpen();
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
        Add a Test for this Assignment
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the test&apos;s details.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Test Name"
          type="text"
          fullWidth
          onChange={(e) => setNewTestName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={toggleOpen}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleAddTest}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTestDialog;
