import type { NextPage } from "next";
import { useQuery } from "urql";
import { GetSubmissionDocument } from "../../gql/generated/graphql";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";

const SubmissionPage: NextPage = () => {
  const router = useRouter();
  const { submissionID } = router.query;
  const [result] = useQuery({
    query: GetSubmissionDocument,
    variables: { id: submissionID as string },
  });

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  return (
    <>
      <Typography align="center" variant="h3">
        {result.data?.submission?.studentID}
      </Typography>
    </>
  );
};

export default SubmissionPage;
