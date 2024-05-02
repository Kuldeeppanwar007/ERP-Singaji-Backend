import { Router } from "express";
import { signUp, logIn, getUsers } from "../controllers/users.js";

const routes = Router();

routes.post('/signup', signUp);
routes.post('/login', logIn);
routes.get('/getusers', getUsers);

export default routes;