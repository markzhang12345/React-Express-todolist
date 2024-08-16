import React, { ReactNode, useEffect } from "react";
import { Button, Layout as AntdLayout, message } from "antd";
import styles from "./index.module.css";
import Head from "next/head";
import { useAuth } from "@/reducers/AuthContext";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import axios from "axios";

const { Header, Content, Footer } = AntdLayout;

export function Layout({ children }: { children: ReactNode }) {
  const [cookies, , removeCookie] = useCookies(["user"]); // 读取 Cookie
  const { state, dispatch } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 从 Cookie 中读取用户名并更新 AuthContext 状态
    const username = cookies.user || "";
    if (username && !state.isAuthenticated) {
      dispatch({ type: "LOGIN", payload: { username } });
    }
  }, [cookies.user, state.isAuthenticated, dispatch]);

  const handleMenuClick = () => {
    axios
      .post("http://localhost:5000/api/logout", {}, { withCredentials: true })
      .then()
      .catch((err) => {
        message.error(err);
      });
    // 清除 Cookie
    removeCookie("user", { path: "/" });
    dispatch({ type: "LOGOUT" });
    message.success("已注销");
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>TodoList</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}></main>
      <AntdLayout>
        <Header className={styles.header}>
          <div>
            TodoList
            <span className={styles.user}>
              当前用户为：{state.username}&ensp;
              <Button type="primary" onClick={handleMenuClick}>
                注销
              </Button>
            </span>
          </div>
        </Header>
        <Content className={styles.sectioninner}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </AntdLayout>
    </>
  );
}
