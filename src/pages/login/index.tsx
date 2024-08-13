import React from "react";
import { Button, Form, message } from "antd";
import { Input } from "antd";
import styles from "./index.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/reducers/AuthContext";
import { useCookies } from "react-cookie";

export default function Login() {
  const [_, setCookie] = useCookies(["user"]);
  const router = useRouter();
  const { dispatch } = useAuth();

  const handlefinish = (values: { name: string; password: string }) => {
    axios
      .post("http://localhost:5000/api/login", values, {
        withCredentials: true, // 确保发送和接收 Cookie
      })
      .then((res) => {
        message.success("登录成功，用户：" + res.data.username);
        dispatch({
          type: "LOGIN",
          payload: { username: res.data.username },
        });

        // 设置cookie
        setCookie("user", JSON.stringify(res.data.username), {
          path: "/",
          maxAge: 3600,
          sameSite: true,
        });
        router.push("/todolist");
      })
      .catch((err) => {
        message.error("登录失败");
        console.log(err);
        message.error(err.response.data.message);
      });
  };

  return (
    <div className={styles.container}>
      <h1>登录 TodoList</h1>
      <Form onFinish={handlefinish}>
        <Form.Item
          label="用户名"
          name="name"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
          &nbsp;
          <Button
            type="primary"
            onClick={() => {
              router.push("/register");
            }}
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
