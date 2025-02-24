import { Request, Response } from "express";
import EspeciesEnum from "../enum/EspeciesEnum";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import { StatusCode } from "../utils/statusCodes";

export default class PetController {

  constructor(private repository: PetRepository) { }

  async criaPet(req: Request, res: Response): Promise<any> {
    const { nome, dataDeNascimento, especie, adotado } = req.body as PetEntity;

    if (!Object.values(EspeciesEnum).includes(especie)) {
      return res.status(StatusCode.BAD_REQUEST).json({ erro: "Especie inválida" });
    }
    const novoPet = new PetEntity(nome, dataDeNascimento, especie, adotado);


    if (!Object.values(EspeciesEnum).includes(especie)) {
      return res.status(StatusCode.BAD_REQUEST).json({ erro: "Especie inválida" });
    }
    novoPet.adotado = adotado;

    await this.repository.criaPet(novoPet);

    return res.status(StatusCode.CREATED).json(novoPet);
  }

  async listaPets(req: Request, res: Response): Promise<any> {
    const listaDePets = await this.repository.listaPets();
    return res.status(StatusCode.OK).json(listaDePets);
  }

  async atualizaPet(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(Number(id), req.body as PetEntity);

    if (!success) {
      return res.status(StatusCode.NOT_FOUND).json({ message });
    }
    return res.sendStatus(StatusCode.NO_CONTENT)
  }

  async deletaPet(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const { success, message } = await this.repository.deletaPet(Number(id));
    if (!success) {
      return res.status(StatusCode.NOT_FOUND).json({ message });
    }
    return res.sendStatus(StatusCode.NO_CONTENT)
  }
}

