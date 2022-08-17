import type { NextPage } from 'next';
import { useQuery } from 'urql';
import {
  GetAssignmentsDocument,
} from '../gql/generated/graphql';
import { CustomList } from '../components/CustomList';
import { Typography } from '@mui/material';

const AssignmentsPage: NextPage = () => {
  const [result] = useQuery({
    query: GetAssignmentsDocument,
  });

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  return (
    <>
      <Typography align='center' variant='h3'>
        Assignments
      </Typography>
      <CustomList
        items={
          result.data?.assignments.map((assignment) => {
            return {
              text: assignment.name,
              href: `/assignment/${assignment.id}`,
            };
          }) ?? []
        }
      />
    </>
  );
};

export default AssignmentsPage;
