import express from 'express';
import { ensureServiceFileExists, clearServiceFile} from './service/FileService.js';
import ServiceRegistryRoutes from "./router/ServiceRegistryRoutes.js"

const app = express();
app.use(express.json());
app.use(ServiceRegistryRoutes);

ensureServiceFileExists();

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Aplicação rodando na porta: ${process.env.PORT}`);
});

process.on('SIGINT', () => {
    clearServiceFile();
    console.log('Arquivos de serviços limpos ao encerrar a aplicação.');
    server.close(() => {
        process.exit(0);
    });
});
