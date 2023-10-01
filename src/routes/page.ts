import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('Register')
})

router.get('/Dashboard', (req: Request, res: Response, next: NextFunction) => {
    res.render('Home')
})

router.get('/Login', (req: Request, res: Response, next: NextFunction) => {
    res.render('login')
})



export default router;