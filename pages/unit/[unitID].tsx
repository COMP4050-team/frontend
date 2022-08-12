import type { NextPage } from 'next';
import styles from '../../styles/Home.module.css';
import { useQuery } from 'urql';
import {
  GetUnitDocument,
  GetUnitQuery,
  GetUnitQueryVariables,
} from '../../gql/generated/graphql';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
    <div className={styles.container}>
      <h1 className={styles.title}> </h1>

      <h3 className={styles.title}>{result.data?.unit?.name}</h3>
      {result.data?.unit?.classes.map((class_) => (
        <div key={class_.id}>
          <Link href={`/unit/${unitID}/class/${class_.id}`}>
            <a>
              <h3>{class_.name}</h3>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UnitPage;
