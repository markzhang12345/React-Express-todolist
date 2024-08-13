import React from "react";
import { Button, Form, message } from "antd";
import { Input } from "antd";
import styles from "./index.module.css";
import axios from "axios";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const handlefinish = (values: {
    name: String;
    password: String;
    repeatPassword: String;
  }) => {
    if (values.password !== values.repeatPassword) {
      message.error("两次输入的密码不同");
      return;
    }

    axios
      .post("http://localhost:5000/api/register", values)
      .then(() => {
        message.success("注册成功");
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
        message.error("注册失败");
        message.error(err.response.data.message);
      });
  };

  return (
    <div className={styles.container}>
      <h1>Register</h1>
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
        <Form.Item
          label="重复密码"
          name="repeatPassword"
          rules={[{ required: true, message: "请再次输入密码" }]}
        >
          <Input.Password placeholder="请再次输入密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
