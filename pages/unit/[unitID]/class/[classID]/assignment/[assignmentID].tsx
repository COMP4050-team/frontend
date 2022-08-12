import type { NextPage } from 'next';
import styles from '../../../../../../styles/Home.module.css';
import { useQuery } from 'urql';
import {
  GetAssignmentDocument,
  GetAssignmentQuery,
  GetAssignmentQueryVariables,
} from '../../../../../../gql/generated/graphql';
import { useRouter } from 'next/router';

const ClassPage: NextPage = () => {
  const router = useRouter();
  const { assignmentID } = router.query;
  const [result] = useQuery<GetAssignmentQuery, GetAssignmentQueryVariables>({
    query: GetAssignmentDocument,
    variables: { id: assignmentID as string },
  });

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}> </h1>

      <h3 className={styles.title}>{result.data?.assignment?.name}</h3>
      {result.data?.assignment?.tests.map((test) => (
        <div key={test.id}>
          <h3>
            {test.id} - {test.name}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default ClassPage;
