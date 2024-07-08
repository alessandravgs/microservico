import express from "express";
import AuthRoutes from "./routes/AuthRoutes.js";
import { registerService } from "./service/RegisterService.js";

const app = express();
app.use(express.json());
app.use(AuthRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`Aplicação rodando na porta: ${process.env.PORT}`);
});

registerService();