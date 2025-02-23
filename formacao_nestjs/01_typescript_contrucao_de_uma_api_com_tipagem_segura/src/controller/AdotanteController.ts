import AdotanteEntity from "../entities/AdotanteEntity";
import { AdotanteRepository } from "../repositories/AdotanteRepository";
import { Request, Response } from "express";

export default class AdotanteController {

  constructor(private repository: AdotanteRepository) { };

  async criaAdotante(req: Request, res: Response): Promise<any> {
    try {
      console.log(req.body);
      const { nome, celular, senha, foto, endereco } = <AdotanteEntity>req.body;
      const novoAdotante = new AdotanteEntity(nome, senha, celular, foto, endereco);
      console.log(novoAdotante)

      await this.repository.criaAdotante(novoAdotante);

      return res.status(201).json(novoAdotante);

    } catch (error) {

      return res.status(500).json({ error: 'Erro ao criar o adotante' });
    }
  };

  async listaAdotantes(req: Request, res: Response): Promise<any> {
    try {
      const adotantes = await this.repository.listaAdotantes();
      return res.status(200).json(adotantes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar os adotantes' });
    }
  };

}