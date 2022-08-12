import type { NextPage } from 'next';
import styles from '../../../../styles/Home.module.css';
import { useQuery } from 'urql';
import {
  GetClassDocument,
  GetClassQuery,
  GetClassQueryVariables,
} from '../../../../gql/generated/graphql';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ClassPage: NextPage = () => {
  const router = useRouter();
  const { unitID, classID } = router.query;
  const [result] = useQuery<GetClassQuery, GetClassQueryVariables>({
    query: GetClassDocument,
    variables: { id: classID as string },
  });

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}> </h1>

      <h3 className={styles.title}>{result.data?.class?.name}</h3>
      {result.data?.class?.assignments.map((assignment) => (
        <div key={assignment.id}>
          <Link
            href='/unit/[unitID]/class/[classID]/assignment/[assignmentID]'
            as={`/unit/${unitID}/class/${classID}/assignment/${assignment.id}`}
          >
            <a>
              <h3>{assignment.name} - Due {assignment.dueDate}</h3>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ClassPage;
