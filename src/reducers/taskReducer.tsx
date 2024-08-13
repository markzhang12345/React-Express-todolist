import { Reducer } from "react";

// 定义任务对象类型
export interface Task {
  _id: String;
  taskname: String;
  date: Date;
  isFinish: boolean;
}

// 定义任务状态类型
export interface TaskState {
  tasks: Task[];
}

// 定义操作类型
export type TaskAction =
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: String }
  | { type: "UPDATE_TASK"; payload: String };

// 初始状态
export const initialState: TaskState = {
  tasks: [],
};

// Reducer函数
export const taskReducer: Reducer<TaskState, TaskAction> = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "ADD_TASK":
      const newIdTask = action.payload as Task;
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload
            ? { ...task, isFinish: !task.isFinish }
            : task
        ),
      };
    default:
      return state;
  }
};
