import prisma from "../lib/prisma.js";

export const addTask = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  const { title, description, categoryId } = body;
  try {
    if (categoryId === 1) {
      const newTask = await prisma.task.create({
        data: {
          title,
          description,
          completed: false,
          userId: tokenUserId,
        },
      });
      res.status(200).json(newTask);
    } else {
      const newTask = await prisma.task.create({
        data: {
          title,
          description,
          categoryId,
          completed: false,
          userId: tokenUserId,
        },
      });
      res.status(200).json(newTask);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add task" });
  }
};

export const getTasks = async (req, res) => {
  try {
    // console.log(req.userId);
    const tasks = await prisma.task.findMany({
      where: { userId: req.userId },
      include: {
        Category: true,
      },
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get tasks!" });
  }
};

export const getCategoryTasks = async (req, res) => {
  try {
    // console.log(req.userId);
    const tasks = await prisma.task.findMany({
      where: { userId: req.userId, categoryId: req.params.id },
      include: {
        Category: true,
      },
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get tasks!" });
  }
};

export const getTask = async (req, res) => {
  const id = req.params.id; // taskID
  const tokenUserId = req.userId;

  try {
    const task = await prisma.task.findUnique({
      where: {
        id: id,
      },
    });
    if (task.userId !== tokenUserId) {
      return res.status(403).json({ message: "You are not authorized" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get task!" });
  }
};

export const updateTask = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const inputs = req.body;

  try {
    const taskUserId = await prisma.task.findUnique({
      where: {
        id: id,
      },
      select: {
        userId: true,
      },
    });

    if (taskUserId.userId !== tokenUserId) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: id,
      },
      data: inputs,
    });
    // const { password: userPassword, ...rest } = updatedUser;
    console.log("task updated successfully!");
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update task!" });
  }
};

export const deleteTask = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  console.log("deleted task: " + id);
  // console.log(tokenUserId);

  try {
    const taskUserId = await prisma.task.findUnique({
      where: {
        id: id,
      },
      select: {
        userId: true,
      },
    });

    if (taskUserId.userId !== tokenUserId) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    await prisma.task.delete({
      where: { id },
    });
    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete task!" });
  }
};
