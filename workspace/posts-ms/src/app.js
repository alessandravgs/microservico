import express from 'express';
import { connectDB } from './database/mysql_db.js';
import PostRoutes from "./routes/PostRoutes.js";
import { registerService } from "./service/RegisterService.js";

const app = express();

app.use(express.json());
app.use(PostRoutes);


connectDB().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`App rodando em ${process.env.PORT}`);
    });

    registerService();

}).catch(err => {
    console.error('Falha ao iniciar o serviço:', err);
});