import {AuthService} from "../service/AuthService.js";

export class AuthController {

    static async login(req, res){
        try{
            const token = await AuthService.createUserToken(req);
            res.status(200).json({token: token});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode ).json({message: error.message});
        }
    }
}