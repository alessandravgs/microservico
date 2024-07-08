import bcrypt from "bcrypt";
import axios from 'axios';
import jwt from "jsonwebtoken";

export class AuthService{

    static async createUserToken(req){
        const user = await this.login(req);

        const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
        
        return token;
    }

    static async login(req){
        const {username, password} = req.body;

        this.verifyFieldIsNull(username, "O login é obrigatório.", 422);
        this.verifyFieldIsNull(password, "A senha é obrigatória.", 422);

        const user = await this.getUser(username);

        const isPasswordHash = await bcrypt.compare(password, user.password);
        this.verifyFieldIsNull(isPasswordHash, "Login ou senha inválidos.", 401);

        return user;
    }

    static async getUser(username){
        try{
            const response = await axios.get(`${process.env.SERVICE_GATEWAY_URL}/${process.env.USER_SERVICE_NAME}/users/${username}`);
            const user = response.data.user;
            this.verifyFieldIsNull(user, "Usuário não encontrado", 404);
    
            return user;

        }catch(error){
            this.buildError(error.message, error.statusCode);
        }
    }

    static verifyFieldIsNull(field, message, statusCode){
        if(!field){
            this.buildError(message, statusCode)
        }
    }

    static buildError(message, statusCode){
        const error = new Error(message);
        error.statusCode = statusCode;
        throw error;
    }
}