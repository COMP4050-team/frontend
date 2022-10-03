import type { NextPage } from "next";
import { useQuery } from "urql";
import { GetSubmissionDocument } from "../../gql/generated/graphql";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { setNodes } from "../../state/features/navbar/navbarSlice";
import { useDispatch } from "react-redux";

const SubmissionPage: NextPage = () => {
  const router = useRouter();
  const { submissionID } = router.query;
  const [result] = useQuery({
    query: GetSubmissionDocument,
    variables: { id: submissionID as string },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (result?.data?.submission) {
      dispatch(
        setNodes([
          { value: "ProTest", href: "/" },
          {
            value: result.data.submission.unit.name,
            href: `/unit/${result.data.submission.unit.id}`,
          },
          {
            value: result.data.submission.class.name,
            href: `/class/${result.data.submission.class.id}`,
          },
          {
            value: result.data.submission.assignment.name,
            href: `/assignment/${result.data.submission.assignment.id}`,
          },
          {
            value: result.data.submission.studentID,
            href: `/submission/${result.data.submission.id}`,
          },
        ])
      );
    }
  }, [dispatch, result.data?.submission]);

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
