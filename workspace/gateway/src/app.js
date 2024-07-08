import express from 'express';
import GatewayRoutes from "./router/GatewayRoutes.js";

const app = express();
app.use(express.json());
app.use(GatewayRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`Aplicação rodando na porta: ${process.env.PORT}`);
});

    