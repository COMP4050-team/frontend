import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import SignUp from "../components/SignUp";

const Register: NextPage = () => {
  return (
    <div className={styles.container}>
      <SignUp />
    </div>
  );
};

export default Register;
