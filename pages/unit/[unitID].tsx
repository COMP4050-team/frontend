import type { NextPage } from 'next';
import { useQuery } from 'urql';
import {
  GetUnitDocument,
  GetUnitQuery,
  GetUnitQueryVariables,
} from '../../gql/generated/graphql';
import { useRouter } from 'next/router';
import { CustomList } from '../../components/CustomList';
import { Typography } from '@mui/material';

const UnitPage: NextPage = () => {
  const router = useRouter();
  const { unitID } = router.query;
  const [result] = useQuery<GetUnitQuery, GetUnitQueryVariables>({
    query: GetUnitDocument,
    variables: { id: unitID as string },
  });

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  return (
    <>
      <Typography align='center' variant='h3'>
        {result.data?.unit?.name}
      </Typography>
      <CustomList
        items={
          result.data?.unit?.classes.map((class_) => {
            return {
              text: class_.name,
              href: `/class/${class_.id}`,
            };
          }) ?? []
        }
      />
    </>
  );
};

export default UnitPage;
