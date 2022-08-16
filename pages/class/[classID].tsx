import type { NextPage } from 'next';
import { useQuery } from 'urql';
import {
  GetClassDocument,
  GetClassQuery,
  GetClassQueryVariables,
} from '../../gql/generated/graphql';
import { useRouter } from 'next/router';
import { CustomList } from '../../components/CustomList';

const ClassPage: NextPage = () => {
  const router = useRouter();
  const { classID } = router.query;
  const [result] = useQuery<GetClassQuery, GetClassQueryVariables>({
    query: GetClassDocument,
    variables: { id: classID as string },
  });

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  return (
    <div className='container'>
      <CustomList
        items={
          result.data?.class?.assignments.map((assignment) => {
            return {
              text: assignment.name,
              href: `/assignment/${assignment.id}`,
            };
          }) ?? []
        }
      />
    </div>
  );
};

export default ClassPage;
