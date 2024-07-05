import prisma from "../lib/prisma.js";

export const addCategory = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newCategory = await prisma.category.create({
      data: {
        ...body,
        userId: tokenUserId,
      },
    });
    res.status(200).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add category" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { userId: req.userId },
      include:{
        tasks: true,
      }
    });
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get categories!" });
  }
};

// export const getCategory = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const category = await prisma.category.findUnique({
//       where: {
//         id: id,
//       },
//     });
//     res.status(200).json(category);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Failed to get category!" });
//   }
// };

export const deleteCategory = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    if (category.userId !== tokenUserId) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    await prisma.category.delete({
      where: { id },
    });
    res.status(200).json({ message: "category deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete category!" });
  }
};
