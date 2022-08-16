import type { NextPage } from 'next';
import { useQuery } from 'urql';
import { GetClassesDocument, GetClassesQuery } from '../gql/generated/graphql';
import { CustomList } from '../components/CustomList';
import { Typography } from '@mui/material';

const ClassesPage: NextPage = () => {
  const [result] = useQuery<GetClassesQuery>({
    query: GetClassesDocument,
  });

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  return (
    <>
      <Typography align='center' variant='h3'>
        Classes
      </Typography>
      <CustomList
        items={
          result.data?.classes.map((class_) => {
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

export default ClassesPage;
