import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { registerUserSchema, option, loginUserSchema } from '../utils/utils';
import { UserInstance } from '../model/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { todoInstance } from '../model/todomodel';

const jwtsecret = process.env.JWT_SECRET as string;

// ============other API================
// export const Register = async(req: Request, res:Response, ) => {
//     try {
//        const { email, fullName, password, confirm_password } = req.body 
//          const iduuid = uuidv4()
        
//        // validate with joi or zod
//        const validateResult = registerUserSchema.validate(req.body, option)

//         if(validateResult.error) {
//             return res.status(400).json({
//                 Error: validateResult.error.details[0].message
//             })
//         }
//           // salt for password hashing
//           const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt())

//           // check if user already exist
//           const user = await UserInstance.findOne({
//             where: { email: email },
//           });

//           if(!user) {
//               const newUser = await UserInstance.create({
//                 id: iduuid,
//                  email,
//                  fullName,
//                  password: passwordHash,
//                 })
//             return res.status(201).json({ msg: "Registration successfully", newUser });
//           }
//         return res.status(400).json({ error: "User already exist" })
//     }catch(err) {
//         console.log(err)
//     }
// };


// export const Login = async(req: Request, res: Response) => {
//     const { email, password } = req.body 
//       const iduuid = uuidv4()
        
//        // validate with joi or zod
//        const validateResult = loginUserSchema.validate(req.body, option)

//         if(validateResult.error) {
//             return res.status(400).json({
//                 Error: validateResult.error.details[0].message });
//         }

//         const User = await UserInstance.findOne({
//             where: { email: email },
//           }) as unknown as {[key:string]: string}

//           const { id } = User
//           const token = jwt.sign({ id }, jwtsecret, { expiresIn: "1d"})
//           // res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000})

//           const validUser = await bcrypt.compare(password, User.password);

//           if(validUser){
//             return res.status(201).json({
//                 msg: "User Login successfully",
//                 User,
//                 token
//             })
//           }
//          return res.status(400).json({
//             error: "Invalid credentials"
//         });
// }


export const getUserAndTodo = async(req: Request, res: Response) =>{
  try {
    
    const getAllUser = await UserInstance.findAndCountAll({
      include: [
        {
          model: todoInstance,
          as: "todos",
        }
      ]
    })
    return res.status(200).json({ 
      msg: "All todos, gotten", 
    count: getAllUser.count,
    users: getAllUser.rows
    });

  }catch(err){
    console.log(err)
}
}






// ============EJS================
export const Register = async(req: Request, res:Response, ) => {
      try {
         const { email, fullName, password, confirm_password } = req.body 
           const iduuid = uuidv4()
          
         // validate with joi or zod
         const validateResult = registerUserSchema.validate(req.body, option)
  
          if(validateResult.error) {
              return res.render("Register", {
                error: validateResult.error.details[0].message })
              
              }
          
            // salt for password hashing
            const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt())
  
            // check if user already exist
            const user = await UserInstance.findOne({
              where: { email: email },
            });
  
            if(!user) {
                const newUser = await UserInstance.create({
                  id: iduuid,
                   email,
                   fullName,
                   password: passwordHash,
                  })
                  return res.redirect("/Login");
            }
          return res.render("Register", { error: "User already exist" })
      }catch(err) {
          console.log(err)
      }
  };

export const Login = async(req: Request, res: Response) => {
    const { email, password } = req.body 
    //    const iduuid = uuidv4()
        
       // validate with joi or zod
       const validateResult = loginUserSchema.validate(req.body, option)

        if(validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message
            })
        }

        const User = await UserInstance.findOne({
            where: { email: email },
          }) as unknown as {[key:string]: string}

          const { id } = User;
          const token = jwt.sign({ id }, jwtsecret, { expiresIn: "1d"})
          res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000})

          const validUser = await bcrypt.compare(password, User.password);

          if(validUser){
            res.render("dashboard")
            }
          
         return res.render("Login", { error: "Invalid credentials" })
}



// ============EJS================
  