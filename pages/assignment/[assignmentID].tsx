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

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  const toggleAddTestDialog = () => {
    setShowAddTestDialog(!showAddTestDialog);
  };

  return (
    <>
      <Typography align="center" variant="h3">
        {result.data?.assignment?.name}
      </Typography>

      <AddTestDialog
        assignmentID={assignmentID as string}
        open={showAddTestDialog}
        toggleOpen={toggleAddTestDialog}
        onClose={toggleAddTestDialog}
        reexecuteQuery={reexecuteQuery}
      />

      <AddSubmissionDialog
        assignmentID={assignmentID as string}
        open={showAddTestDialog}
        toggleOpen={toggleAddTestDialog}
        onClose={toggleAddTestDialog}
        reexecuteQuery={reexecuteQuery}
      />

      <Button aria-label="add" onClick={toggleAddTestDialog}>
        Add Test
      </Button>

      <Button aria-label="add" onClick={toggleAddTestDialog}>
        Add Submission
      </Button>

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
