import AdotanteEntity from "../entities/AdotanteEntity";
import { AdotanteRepository } from "../repositories/AdotanteRepository";
import { Request, Response } from "express";
import { StatusCode } from "../utils/statusCodes";

export default class AdotanteController {

  constructor(private repository: AdotanteRepository) { };

  async criaAdotante(req: Request, res: Response): Promise<any> {
    try {
      console.log(req.body);
      const { nome, celular, senha, foto, endereco } = <AdotanteEntity>req.body;
      const novoAdotante = new AdotanteEntity(nome, senha, celular, foto, endereco);
      console.log(novoAdotante)

      await this.repository.criaAdotante(novoAdotante);

      return res.status(StatusCode.CREATED).json(novoAdotante);

    } catch (error) {

      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao criar o adotante' });
    }
  };

  async listaAdotantes(req: Request, res: Response): Promise<any> {
    try {
      const adotantes = await this.repository.listaAdotantes();
      return res.status(StatusCode.OK).json(adotantes);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao listar os adotantes' });
    }
  };

  async atualizaAdotante(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const { success, message } = await this.repository.atualizaAdotante(Number(id), req.body as AdotanteEntity);
      if (!success) {
        return res.status(StatusCode.NOT_FOUND).json({ message });
      }
      return res.sendStatus(StatusCode.NO_CONTENT);
    } catch (error) {

    }
  }

}