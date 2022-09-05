import type { NextPage } from "next";
import { useQuery } from "urql";
import { GetSubmissionsDocument } from "../gql/generated/graphql";
import { CustomList } from "../components/CustomList";
import { Typography } from "@mui/material";

const TestsPage: NextPage = () => {
  const [result] = useQuery({
    query: GetSubmissionsDocument,
  });

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  return (
    <>
      <Typography align="center" variant="h3">
        Submissions
      </Typography>
      <CustomList
        items={
          result.data?.submissions.map((submission) => {
            return {
              text: submission.studentID,
              href: `/submission/${submission.id}`,
            };
          }) ?? []
        }
      />
    </>
  );
};

export default TestsPage;
