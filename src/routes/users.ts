import express from 'express';
import { Register, Login, getUserAndTodo } from '../controller/userController';
const router = express.Router();

/* GET users listing. */
router.post('/register', Register)
router.post('/login', Login)
router.get('/get-User', getUserAndTodo)


export default router;
