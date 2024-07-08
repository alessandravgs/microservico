import { User } from "../model/User.js";
import Verify from "../helpers/verifyFields.js";
import bcrypt from 'bcrypt';
import axios from 'axios';

export class UserService {

    static async findAllUsers(){
        try{
            const users = await User.findAll({attributes: {exclude:['password']} });
            return users;    

        }catch(error){
            Verify.buildError(error.message, error.statusCode);
        }
    }

    static async findAllUsersAndPosts(req){
        try{
            const token = req.headers.authorization.split(' ')[1];

            const users = await this.findAllUsers();

            const usersAndPosts = await Promise.all(
                users.map(async(user)=>{
                    try{
                        const response = await axios.get(`${process.env.SERVICE_GATEWAY_URL}/${process.env.POST_SERVICE_NAME}/posts/user/${user.id}`, {
                            headers: {
                              Authorization: `Bearer ${token}`
                            }
                        });

                        const posts = response.data.posts;
                        return { user, posts }

                    }catch(error){
                        console.error(error.message);
                        return { user, posts: [] }
                    }
                })
            );

            return usersAndPosts;

        }catch(error){
            Verify.buildError(error.message, error.statusCode);
        }
    }

    static async save(req){
        try{
            const {username, password} = req.body;
            Verify.verifyFieldIsNull(username, "O username é obrigatório.", 422);
            Verify.verifyFieldIsNull(password, "O password é obrigatório.", 422);

            const userExists = await User.findOne({where: {username : username}});
            Verify.verifyFieldIsNotNull(userExists, "Por favor utilize outro username, este já existe.", 422);

            const hashPassword = await bcrypt.hash(password, 10);
            const user = await User.create({username: username, password: hashPassword});
            const result = user.get({plain: true});
            delete result.password;
            return result;

        }catch(error){
            Verify.buildError(error.message, 500);
        }
    }

    static async findUserByName(req){
        try{
            const {username} = req.params;
            const user = await User.findOne({where: {username : username}});
            return user;

        }catch(error){
            Verify.buildError(error.message, 500);
        }
    }

}