import { Request, Response } from "express";
import type petType from "../types/petType";
import EspeciesEnum from "../enum/EspeciesEnum";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

let listaDePets: petType[] = [];

let id = 0;
function geraId() {
  return ++id;
}

export default class PetController {

  constructor(private repository: PetRepository) { }

  criaPet(req: Request, res: Response): any {
    const { nome, dataDeNascimento, especie, adotado } = req.body as PetEntity;

    if (!Object.values(EspeciesEnum).includes(especie)) {
      return res.status(400).json({ erro: "Especie inválida" });
    }
    const novoPet = new PetEntity();

    novoPet.id = geraId()
    novoPet.nome = nome;
    novoPet.dataDeNascimento = dataDeNascimento;
    novoPet.especie = especie;
    novoPet.adotado = adotado;

    this.repository.criaPet(novoPet);

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

  deletaPet(req: Request, res: Response): any {
    const { id } = req.params;
    const pet = listaDePets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res.status(404).json({ erro: "Pet não encontrado" });
    }
    const index = listaDePets.indexOf(pet);
    listaDePets.splice(index, 1);
    return res.status(200).json({ mensagem: "Pet deletado com sucesso" });
  }
}

