import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useQuery } from "urql";
import { GetUnitsDocument } from "../gql/generated/graphql";
import { Typography } from "@mui/material";
import React from "react";

const Home: NextPage = () => {
  const [result] = useQuery({ query: GetUnitsDocument });

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  return (
    <div className={styles.container}>
      <Head>
        <title>ProTest</title>
        <meta
          name="description"
          content="An application to test Processing Porjects"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography align="center" variant="h1">
        Welcome to ProTest
      </Typography>
    </div>
  );
};

export default Home;
