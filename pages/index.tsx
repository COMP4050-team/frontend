import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useQuery } from 'urql';
import { GetUnitsDocument, GetUnitsQuery } from '../gql/generated/graphql';

const Home: NextPage = () => {
  const [result] = useQuery<GetUnitsQuery>({ query: GetUnitsDocument });

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1 className={styles.title}>Units</h1>

      <div>
        {result.data?.units.map(({ id, name }) => (
          <div key={id}>
            <h3 className={styles.title}>{name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
