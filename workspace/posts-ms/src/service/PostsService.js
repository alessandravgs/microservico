import { Post } from "../model/Post.js";
import Verify from "../helpers/verifyFields.js";

export class PostService {

    static async findAllPosts(){
        try{
            const posts = await Post.findAll();
            return posts;
        }catch(error){
            Verify.buildError(error.message, error.statusCode);
        }
    }

    static async savePost(req){
        try{
            const {title, user_id} = req.body;

            Verify.verifyFieldIsNull(title, "O title é obrigatório.", 422);
            Verify.verifyFieldIsNull(user_id, "O user_id é obrigatório.", 422);

            const post = await Post.create({title: title, user_id: user_id});

            return post;
        }catch(error){
            Verify.buildError(error.message, error.statusCode);
        }
    }

    static async findByUserId(req){
        try{
            const {id} = req.params;
            const posts = await Post.findAll({where: {user_id: id}});
            return posts;
        }catch(error){
            Verify.buildError(error.message, error.statusCode);
        }
    }

}