import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import AuthForm from "../components/AuthForm";

const Register: NextPage = () => {
  return (
    <div className={styles.container}>
      <AuthForm isRegister />
    </div>
  );
};

export default Register;
