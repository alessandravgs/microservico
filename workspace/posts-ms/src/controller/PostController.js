import { PostService } from "../service/PostsService.js";

export class PostController {

    static async findAll(req, res){
        try{
            const posts = await PostService.findAllPosts();
            res.status(200).json({posts});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode ).json({message: error.message});
        }
    }

    static async save(req, res){
        try{
            const post = await PostService.savePost(req);
            res.status(201).json({post});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode ).json({message: error.message});
        }
    }

    static async findByUserId(req, res){
        try{
            const posts = await PostService.findByUserId(req);
            res.status(201).json({posts});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode ).json({message: error.message});
        }
    }

}