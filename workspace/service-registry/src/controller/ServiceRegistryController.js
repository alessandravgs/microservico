import {RegistryService} from "../service/RegistryService.js";

export class ServiceRegistryController {

    static async getAllServices(req, res){
        try{
            const services = await RegistryService.getAllServices();
            res.status(200).json({services});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode ).json({message: error.message});
        }
    }

    static async getServiceByName(req, res){
        try{
            const urls = await RegistryService.getServiceByName(req);
            res.status(200).json({urls});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode ).json({message: error.message});
        }
    }

    static async registerService(req, res){
        try{
            const result = await RegistryService.registerService(req);
            console.log(result);
            res.status(200).json({message: result});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({message: error.message});
        }
    }
}