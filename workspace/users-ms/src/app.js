import express from 'express';
import { connectDB } from './database/mysql_db.js';
import UserRoutes from "./routes/UserRoutes.js";
import { registerService } from "./service/RegisterService.js";

const app = express();

app.use(express.json());
app.use(UserRoutes);

connectDB().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Aplicação rodando na porta: ${process.env.PORT}`);
    });

    registerService();

}).catch(err => {
    console.error('Falha ao iniciar o serviço:', err);
});
