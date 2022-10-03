import type { NextPage } from "next";
import { useQuery } from "urql";
import { GetTestsDocument } from "../gql/generated/graphql";
import { CustomList } from "../components/CustomList";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { setNodes } from "../state/features/navbar/navbarSlice";
import { useDispatch } from "react-redux";

const TestsPage: NextPage = () => {
  const [result] = useQuery({
    query: GetTestsDocument,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setNodes([
        { value: "ProTest", href: "/" },
        { value: "Tests", href: "/tests" },
      ])
    );
  }, [dispatch]);

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  return (
    <>
      <Typography align="center" variant="h3">
        Tests
      </Typography>
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
