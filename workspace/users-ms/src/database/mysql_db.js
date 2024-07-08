import { sequelize } from "./instances/msql.js";

export const connectDB = async()=>{
    try{
        await sequelize.sync();
        console.log(`Conectado no banco de dados: ${process.env.MYSQL_DB_NAME}`);
    }catch(error){
        console.log(`Erro: ${error.message}`);
        process.exit(1);
    }
};