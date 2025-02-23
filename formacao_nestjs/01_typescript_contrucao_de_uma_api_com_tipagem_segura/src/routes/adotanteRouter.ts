import express from "express";
import AdotanteController from "../controller/AdotanteController";
import { AdotanteRepository } from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";
import AdotanteEntity from "../entities/AdotanteEntity";

const router = express.Router();
const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository(AdotanteEntity));
const adotanteController = new AdotanteController(adotanteRepository);

router.post("/", (req, res) => adotanteController.criaAdotante(req, res));
router.get("/", (req, res) => adotanteController.listaAdotantes(req, res));

export default router;