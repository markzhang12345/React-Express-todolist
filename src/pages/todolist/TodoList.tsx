import { Form, Input, Button, DatePicker, List, Checkbox, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import React from "react";
import styles from "./index.module.css";
import axios from "axios";
import { useAuth } from "@/reducers/AuthContext";
import { useEffect, useReducer } from "react";
import { taskReducer, initialState, Task } from "@/reducers/taskReducer";
import { useCookies } from "react-cookie";

export function TodoList() {
  const [taskstate, dispatch] = useReducer(taskReducer, initialState);
  const { state: authState } = useAuth();
  const [form] = Form.useForm();
  const [cookies] = useCookies(["user"]);

  //从数据库拉任务
  useEffect(() => {
    const username = cookies.user || "{}";
    if (!username) {
      message.error("未找到用户信息");
      return;
    }

    axios
      .get<Task[]>("http://localhost:5000/api/tasks", {
        params: {
          username: username,
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: "SET_TASKS", payload: res.data });
      })
      .catch((err) => {
        // message.error("获取任务失败");
        // message.error(err.response?.data?.message || "未知错误");
      });
  }, [authState.username]);

  const handleSubmitFinish = (values: { taskname: String; date: Date }) => {
    const username = cookies.user || "{}";
    if (!username) {
      message.error("未找到用户信息");
      return;
    }

    // 新建任务
    const newTask = {
      taskname: values.taskname,
      date: values.date,
      username: username,
      isFinish: false,
    };

    axios
      .post("http://localhost:5000/api/tasks", newTask, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: "ADD_TASK", payload: res.data.task });
        message.success("任务设置成功");
      })
      .catch((err) => {
        message.error("设置失败");
        message.error(err.response?.data?.message || "未知错误");
      });

    //清空表单
    form.resetFields();
  };

  const handleDelete = (task: Task) => {
    axios
      .delete("http://localhost:5000/api/tasks", {
        params: {
          id: task._id,
        },
        withCredentials: true,
      })
      .then(() => {
        dispatch({ type: "DELETE_TASK", payload: task._id });
      })
      .catch((err) => {
        message.error("删除失败");
        message.error(err.response?.data?.message || "未知错误");
      });
  };

  const handleCheckbox = (task: Task) => {
    axios
      .put("http://localhost:5000/api/tasks", null, {
        params: {
          id: task._id,
        },
        withCredentials: true,
      })
      .then(() => {
        dispatch({ type: "UPDATE_TASK", payload: task._id });
      })
      .catch((err) => {
        message.error("任务状态更新失败");
        message.error(err.response?.data?.message || "未知错误");
      });
  };

  const getTaskItemStyle = (task: Task) => {
    const currentDate = new Date();
    if (task.isFinish && new Date(task.date) >= currentDate) {
      return { textDecoration: "line-through", color: "black" };
    } else if (task.isFinish && new Date(task.date) < currentDate) {
      return { textDecoration: "line-through", color: "red" };
    } else if (!task.isFinish && new Date(task.date) > currentDate) {
      return { textDecoration: "", color: "black" };
    } else {
      return { textDecoration: "", color: "red" };
    }
  };

  return (
    <div className={styles.submit}>
      <h1>TodoList</h1>
      <Form
        name="tasksubmit"
        form={form}
        onFinish={handleSubmitFinish}
        initialValues={{ taskname: "", date: "" }}
      >
        <Form.Item
          label="任务名"
          name="taskname"
          style={{ marginBottom: "0%" }}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input placeholder="输入任务名称" />
        </Form.Item>
        <Form.Item
          label="截止时间"
          name="date"
          style={{ marginBottom: "0%" }}
          rules={[{ required: true, message: "请选择截止时间" }]}
        >
          <DatePicker placeholder="选择截止时间" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
      <List
        bordered
        dataSource={taskstate.tasks}
        renderItem={(task) => (
          <List.Item key={task._id.toString()}>
            <p style={getTaskItemStyle(task)}>
              {task.taskname}
              <br />
              截止时间：{new Date(task.date).toLocaleDateString()}
            </p>
            <div>
              <Checkbox
                style={{ marginLeft: "auto" }}
                onChange={() => handleCheckbox(task)}
              ></Checkbox>{" "}
              <Button
                icon={<DeleteOutlined />}
                size="small"
                onClick={() => handleDelete(task)}
              />
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
