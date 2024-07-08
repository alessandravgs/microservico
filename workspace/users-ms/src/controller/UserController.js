import { UserService } from "../service/UserService.js";

export class UserController {

    static async findAll(req, res){
        try{
            const users = await UserService.findAllUsers();
            res.status(200).json({users});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode ).json({message: error.message});
        }
    }

    static async findAllUsersAndPosts(req, res){
        try{
            const usersAndPosts = await UserService.findAllUsersAndPosts(req);
            res.status(200).json({usersAndPosts});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode ).json({message: error.message});
        }
    }

    static async save(req, res){
        try{
            const result = await UserService.save(req);
            res.status(201).json({user: result});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode ).json({message: error.message});
        }
    }

    static async findUserByName(req, res){
        try{
            const user = await UserService.findUserByName(req);
            res.status(200).json({user});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode ).json({message: error.message});
        }
    }

    static async ping(req, res){
        res.status(200).json({message: "pong"});
    }
}