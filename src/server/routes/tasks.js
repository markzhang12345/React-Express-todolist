const express = require("express");
const Task = require("../models/Task");
const authenticateToken = require("../middlewares/authenticateToken");
const router = express.Router();

router.post("/tasks", authenticateToken, async (req, res) => {
  const { taskname, date, username } = req.body;

  try {
    // 检查任务名是否已存在

    const taskExists = await Task.findOne({ taskname, username });
    if (taskExists) {
      return res.status(400).json({ message: "该任务已存在" });
    }
    const pattern = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
    if (!pattern.test(taskname))
      return res
        .status(400)
        .json({ message: "任务名不合法，只能包括中文、英文或数字" });

    //创建新的任务
    const newTask = new Task({ taskname, date, isFinish: false, username });
    await newTask.save();

    res.status(201).json({ message: "任务创建成功", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "服务器错误", error: error.message });
  }
});

router.get("/tasks", authenticateToken, async (req, res) => {
  const { username } = req.query;

  try {
    //找到当前用户对应的任务
    const tasks = await Task.find({ username: username });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "服务器错误" });
  }
});

router.delete("/tasks", authenticateToken, async (req, res) => {
  const { id } = req.query;

  try {
    //根据id找任务
    const task = await Task.deleteOne({ _id: id });
    res.status(200).json({ message: "任务删除成功" });
  } catch (err) {
    res.status(500).json({ message: "服务器错误", error: err.message });
  }
});

router.put("/tasks", authenticateToken, async (req, res) => {
  const { id } = req.query;
  try {
    //找任务
    const task = await Task.findById(id);

    //改状态
    task.isFinish = !task.isFinish;
    await task.save();
    res.status(200).json({ message: "更新成功喵" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "更新失败喵，服务器有问题喵", error: err.message });
  }
});

module.exports = router;
