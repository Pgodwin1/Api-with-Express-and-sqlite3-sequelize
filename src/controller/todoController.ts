import { Request, Response } from "express";
import { createTodoSchema, option, updateTodoSchema } from "../utils/utils";
import { todoInstance } from "../model/todomodel";
import { v4 as uuidv4 } from 'uuid';

export const createTodo = async (req: Request | any, res: Response) => {
    try{
      const verify = req.user
    const id = uuidv4()
  const validateResult = createTodoSchema.validate(req.body, option);
   console.log(validateResult);

  if (validateResult.error) {
    return res.status(400).json({ Error: validateResult.error.details[0].message});
    
}
    const todoRecord = await todoInstance.create({
       id,
       ...req.body,
       userId: verify.id

    })
    return res.status(201).json({ msg: "Todo created successfully", todoRecord });
  } catch (err) {
    console.log({ msg: "cannot create todo", err });
  }
   console.log(createTodo);
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    //  getting the limit and offset from the query
    // http://localhost:3000/todos/get-todo?limit=2&offSet=1
    const limit = req.query.limit as number | undefined;
    const offSet = req.query.offSet as number | undefined;
  
    const getAllTodo = await todoInstance.findAndCountAll({
      limit: limit,
      offset: offSet
    })
    return res.status(200).json({ 
      msg: "All todos, gotten", 
      count: getAllTodo.count,
      todo: getAllTodo.rows
    });

  }catch(err){
    console.log(err)
}
}

export const upDateTodo = async (req: Request, res: Response) => {
  try{
        // getting the id from the params
        const   { id } = req.params;  // or const id = req.params.id
        const { completed } = req.body;
        //validate with joi or zod
        const validateResult = updateTodoSchema.validate(req.body, option);
     
       if (validateResult.error) {
            return res.status(400)
            .json({ Error: validateResult.error.details[0].message});    
        }
       const upDateTodo = await todoInstance.findOne({
           where: { id: id },
       })
       if(!upDateTodo){
        return res.status(400).json({
          error: "Todo not found"
        });
       }

      const updateRecord = await upDateTodo.update({
        completed
      })
      return res.status(200).json({
        msg: "Todo updateded successfully", updateRecord
      });

  }catch(err){
    console.log(err)
  }
}

export const deleteTodo = async (req: Request, res: Response) => {
  try{
        // deleting the id from the params
        const { id } = req.params;
        const record = await todoInstance.findOne({where: {id}});
        if(!record) {
          return res.status(400).json({
            error: "cannot find record"
          })
        }
        const deleteRecord = await record.destroy();
        return res.status(200).json({
          msg: "Todo deleted successfully", deleteRecord
        })

  }catch(error) {
    console.log(error)
  }
}