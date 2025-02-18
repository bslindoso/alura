import { Request, Response } from "express";
import type petType from "../types/petType";

let listaDePets: petType[] = [];

export default class PetController {

  criaPet(req: Request, res: Response): any {
    const { id, nome, idade, especie, adotado } = req.body as petType;
    const novoPet: petType = {
      id,
      nome,
      idade,
      especie,
      adotado,
    };

    listaDePets.push(novoPet);

    return res.status(201).json(novoPet);
  }
}

