import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import SignIn from "../components/SignIn";

const Login: NextPage = () => {
  return (
    <div className={styles.container}>
      <SignIn />
    </div>
  );
};

export default Login;
