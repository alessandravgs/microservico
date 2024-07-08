import { readServicesFromFile, saveServicesToFile } from "./FileService.js"

export class RegistryService{

    static async getAllServices(){
        return readServicesFromFile();
    }

    static async getServiceByName(req){
        const { name } = req.params;
        const services = readServicesFromFile();
        const urls = services[name];

        if (urls && urls.length > 0) 
            return urls;

        this.buildError("Serviço não encontrado.", 404);
    }

    static async registerService(req, res){
        const { name, url } = req.body;

        let services = readServicesFromFile();

        if (!services[name]) {
            services[name] = [];
        }

        const index = services[name].indexOf(url);

        if (index === -1) {
            services[name].push(url);
            saveServicesToFile(services);
            return `Serviço registrado com sucesso: ${name} at ${url}`;
        }

        return `Serviço já registrado`;
    }

    static buildError(message, statusCode){
        const error = new Error(message);
        error.statusCode = statusCode;
        throw error;
    }
}