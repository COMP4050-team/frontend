import type { NextPage } from 'next';
import { useQuery } from 'urql';
import {
  GetUnitsDocument,
  GetUnitsQuery,
  GetUnitsQueryVariables,
} from '../gql/generated/graphql';
import { CustomList } from '../components/CustomList';
import { Typography } from '@mui/material';

const UnitsPage: NextPage = () => {
  const [result] = useQuery<GetUnitsQuery, GetUnitsQueryVariables>({
    query: GetUnitsDocument,
  });

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  return (
    <>
      <Typography align='center' variant='h3'>
        Units
      </Typography>
      <CustomList
        items={
          result.data?.units.map((unit) => {
            return {
              text: unit.name,
              href: `/unit/${unit.id}`,
            };
          }) ?? []
        }
      />
    </>
  );
};

export default UnitsPage;
