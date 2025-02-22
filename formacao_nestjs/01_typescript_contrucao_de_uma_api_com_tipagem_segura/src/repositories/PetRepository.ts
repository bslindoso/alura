import { Repository } from "typeorm";
import petType from "../types/petType";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";
import PetEntity from "../entities/PetEntity";

export default class PetRepository implements InterfacePetRepository {
  private repository: Repository<PetEntity>;

  constructor(respository: Repository<PetEntity>) {
    this.repository = respository;
  }
  criaPet(pet: petType): void {
    this.repository.save(pet);
  }
  async listaPets(): Promise<petType[]> {
    return await this.repository.find();
  }
  async atualizaPet(id: number, newData: PetEntity): Promise<{ success: boolean, message?: string }> {
    try {
      const petToUpdate = await this.repository.findOne({ where: { id } });

      if (!petToUpdate) {
        return { success: false, message: "Pet não encontrado" };
      }

      Object.assign(petToUpdate, newData);

      await this.repository.save(petToUpdate);

      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Erro ao atualizar o pet" };
    }
  }

  deletaPet(id: number, pet: petType): void {
    throw new Error("Method not implemented.");
  }


} 