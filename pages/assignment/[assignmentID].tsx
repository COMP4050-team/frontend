import type { NextPage } from 'next';
import { useQuery } from 'urql';
import {
  GetAssignmentDocument,
  GetAssignmentQuery,
  GetAssignmentQueryVariables,
} from '../../gql/generated/graphql';
import { useRouter } from 'next/router';
import { CustomList } from '../../components/CustomList';

const AssignmentPage: NextPage = () => {
  const router = useRouter();
  const { assignmentID } = router.query;
  const [result] = useQuery<GetAssignmentQuery, GetAssignmentQueryVariables>({
    query: GetAssignmentDocument,
    variables: { id: assignmentID as string },
  });

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  return (
    <div className='container'>
      <CustomList
        items={
          result.data?.assignment?.tests.map((test) => {
            return {
              text: test.name,
              href: `/test/${test.id}`,
            };
          }) ?? []
        }
      />
    </div>
  );
};

export default AssignmentPage;
