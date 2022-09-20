import type { NextPage } from "next";
import { useQuery } from "urql";
import { GetTestsDocument } from "../gql/generated/graphql";
import { CustomList } from "../components/CustomList";
import { Typography } from "@mui/material";
import TestFile from "./testFile";

const TestsPage: NextPage = () => {
  const [result] = useQuery({
    query: GetTestsDocument,
  });

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  return (
    <>
      <Typography align="center" variant="h3">
        Tests
      </Typography>
      <TestFile />
      <CustomList
        items={
          result.data?.tests.map((test) => {
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

export default TestsPage;
