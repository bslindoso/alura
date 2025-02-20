import { Request, Response } from "express";
import type petType from "../types/petType";
import EspeciesEnum from "../enum/EspeciesEnum";

let listaDePets: petType[] = [];

let id = 0;
function geraId() {
  return ++id;
}

export default class PetController {

  criaPet(req: Request, res: Response): any {
    const { nome, dataDeNascimento, especie, adotado } = req.body as petType;

    if (!Object.values(EspeciesEnum).includes(especie)) {
      return res.status(400).json({ erro: "Especie inválida" });
    }
    const novoPet: petType = {
      id: geraId(),
      nome,
      dataDeNascimento,
      especie,
      adotado,
    };

    listaDePets.push(novoPet);

    return res.status(201).json(novoPet);
  }

  listaPets(req: Request, res: Response): any {
    return res.status(200).json(listaDePets);
  }

  atualizaPet(req: Request, res: Response): any {
    const { id } = req.params;
    const { nome, dataDeNascimento, especie, adotado } = req.body as petType;

    if (!Object.values(EspeciesEnum).includes(especie)) {
      return res.status(400).json({ erro: "Especie inválida" });
    }

    const pet = listaDePets.find((pet) => pet.id === Number(id));

    if (!pet) {
      return res.status(404).json({ erro: "Pet não encontrado" });
    }
    pet.nome = nome;
    pet.dataDeNascimento = dataDeNascimento;
    pet.especie = especie;
    pet.adotado = adotado;
    return res.status(200).json(pet);
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

