import type { NextPage } from "next";
import { useMutation, useQuery } from "urql";
import {
  CreateTestDocument,
  GetAssignmentDocument,
} from "../../gql/generated/graphql";
import { useRouter } from "next/router";
import { CustomList } from "../../components/CustomList";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";

const AssignmentPage: NextPage = () => {
  const router = useRouter();
  const { assignmentID } = router.query;
  const [result, reexecuteQuery] = useQuery({
    query: GetAssignmentDocument,
    variables: { id: assignmentID as string },
  });
  const [createTestResult, createTest] = useMutation(CreateTestDocument);
  const [showAddTestDialog, setShowAddTestDialog] = useState(false);
  const [newTestName, setNewTestName] = useState("");

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  const toggleAddTestDialog = () => {
    setShowAddTestDialog(!showAddTestDialog);
  };

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
    toggleAddTestDialog();
  };

  return (
    <>
      <Typography align="center" variant="h3">
        {result.data?.assignment?.name}
      </Typography>

      <Dialog
        open={showAddTestDialog}
        onClose={toggleAddTestDialog}
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
          <Button color="primary" onClick={toggleAddTestDialog}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleAddTest}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <IconButton aria-label="add" onClick={toggleAddTestDialog}>
        <Add />
      </IconButton>

      <CustomList
        items={
          result.data?.assignment?.tests.map((test) => {
            return {
              text: test.name,
              href: `/test/${test.id}`,
            };
          }) ?? []
        }
      />
    </>
  );
};

export default AssignmentPage;
