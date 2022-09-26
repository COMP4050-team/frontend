import type { NextPage } from "next";
import { useQuery } from "urql";
import { GetAssignmentDocument } from "../../gql/generated/graphql";
import { useRouter } from "next/router";
import { CustomList } from "../../components/CustomList";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import AddTestDialog from "../../components/tests/AddTestDialog";
import AddSubmissionDialog from "../../components/tests/AddSubmissionDialog";

const AssignmentPage: NextPage = () => {
  const router = useRouter();
  const { assignmentID } = router.query;
  const [result, reexecuteQuery] = useQuery({
    query: GetAssignmentDocument,
    variables: { id: assignmentID as string },
  });
  const [showAddTestDialog, setShowAddTestDialog] = useState(false);
  const [showAddSubmissionDialog, setShowAddSubmissionDialog] = useState(false);

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  const toggleAddTestDialog = () => {
    setShowAddTestDialog(!showAddTestDialog);
  };

  const toggleAddSubmissionDialog = () => {
    setShowAddSubmissionDialog(!showAddSubmissionDialog);
  };

  return (
    <>
      <Typography align="center" variant="h3">
        {result.data?.assignment?.name}
      </Typography>

      <AddTestDialog
        assignmentID={assignmentID as string}
        open={showAddTestDialog}
        onClose={toggleAddTestDialog}
        reexecuteQuery={reexecuteQuery}
      />

      <AddSubmissionDialog
        assignmentID={assignmentID as string}
        assignmentName={result.data?.assignment?.name || "Unknown"}
        unitID={result.data?.assignment?.unitID || "Unknown"}
        open={showAddSubmissionDialog}
        onClose={toggleAddSubmissionDialog}
        reexecuteQuery={reexecuteQuery}
      />

      <Button aria-label="add" onClick={toggleAddTestDialog}>
        Add Test
      </Button>

      <Button aria-label="add" onClick={toggleAddSubmissionDialog}>
        Add Submission
      </Button>

      <div className="flex justify-between max-w-md">
        <div>
          <Typography variant="h5">Tests</Typography>
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
        </div>

        <div>
          <Typography variant="h5">Submissions</Typography>
          <CustomList
            items={
              result.data?.assignment?.submissions.map((submission) => {
                return {
                  text: submission.studentID,
                  href: `/submission/${submission.id}`,
                };
              }) ?? []
            }
          />
        </div>
      </div>
    </>
  );
};

export default AssignmentPage;
