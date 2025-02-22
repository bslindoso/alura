import { Request, Response } from "express";
import EspeciesEnum from "../enum/EspeciesEnum";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

export default class PetController {

  constructor(private repository: PetRepository) { }

  async criaPet(req: Request, res: Response): Promise<any> {
    const { nome, dataDeNascimento, especie, adotado } = req.body as PetEntity;

    if (!Object.values(EspeciesEnum).includes(especie)) {
      return res.status(400).json({ erro: "Especie inválida" });
    }
    const novoPet = new PetEntity(nome, dataDeNascimento, especie, adotado);


    if (!Object.values(EspeciesEnum).includes(especie)) {
      return res.status(400).json({ erro: "Especie inválida" });
    }
    novoPet.adotado = adotado;

    await this.repository.criaPet(novoPet);

    return res.status(201).json(novoPet);
  }

  async listaPets(req: Request, res: Response): Promise<any> {
    const listaDePets = await this.repository.listaPets();
    return res.status(200).json(listaDePets);
  }

  async atualizaPet(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(Number(id), req.body as PetEntity);

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204)
  }

  async deletaPet(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const { success, message } = await this.repository.deletaPet(Number(id));
    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204)
  }
}

