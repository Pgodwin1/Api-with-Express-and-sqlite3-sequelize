import express from "express";
import { createTodo, deleteTodo, getTodos, upDateTodo } from "../controller/todoController";
import { auth } from "../middleware/auth"
const router = express.Router();

/* GET home page. */
router.post("/create", auth, createTodo);
router.get("/get-todo", auth, getTodos);
router.patch("/update-todo/:id", auth, upDateTodo);
router.delete("/delete-todo/:id", auth, deleteTodo);


export default router;
