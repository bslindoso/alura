import express, { Response } from "express";
import router from "./routes/routes";
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";

const app = express();
app.use(express.json());
router(app);

AppDataSource.initialize().then(() => {
  console.log("Banco de dados conectado");
}).catch((erro) => {
  console.log("Erro ao conectar com o banco de dados", erro);
})

export default app;