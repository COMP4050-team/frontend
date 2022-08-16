import type { NextPage } from 'next';
import { useQuery } from 'urql';
import {
  GetTestDocument,
  GetTestQuery,
  GetTestQueryVariables,
} from '../../gql/generated/graphql';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';

const AssignmentPage: NextPage = () => {
  const router = useRouter();
  const { testID } = router.query;
  const [result] = useQuery<GetTestQuery, GetTestQueryVariables>({
    query: GetTestDocument,
    variables: { id: testID as string },
  });

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  return (
    <>
      <Typography align='center' variant='h3'>
        {result.data?.test?.name}
      </Typography>
    </>
  );
};

export default AssignmentPage;
