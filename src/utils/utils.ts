import JOI from 'joi'

export const registerUserSchema = JOI.object().keys({
    email: JOI.string().trim().lowercase().required(),
    fullName: JOI.string().required(),
    password: JOI.string().min(3).regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirm_password: JOI.any().equal(JOI.ref('password')).required().label('Confirm password').messages({ 'any.only': '{{#label}} does not match'})
})

export const option = {
    abortEarly: false,
    errors:{
        wrap: {
            label: ''
        }
    }
}

export const loginUserSchema = JOI.object().keys({
    email: JOI.string().trim().lowercase().required(),
    password: JOI.string().min(3).regex(/^[a-zA-Z0-9]{3,30}$/).required(),
   
})

export const createTodoSchema = JOI.object().keys({
    description: JOI.string().required(),
    completed: JOI.boolean().required()
   
})

export const updateTodoSchema = JOI.object().keys({
    completed: JOI.boolean()
   
})