import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";

export class AdotanteRepository implements InterfaceAdotanteRepository {
  private repository: Repository<AdotanteEntity>;

  constructor(respository: Repository<AdotanteEntity>) {
    this.repository = respository;
  }
  async criaAdotante(adotante: AdotanteEntity): Promise<void> {
    await this.repository.save(adotante);
  }
  async listaAdotantes(): Promise<AdotanteEntity[]> {
    return await this.repository.find();
  }
  async atualizaAdotante(id: number, adotante: AdotanteEntity): Promise<{ success: boolean, message?: string }> {
    try {
      const adotanteToUpdate = await this.repository.findOne({ where: { id } })
      if (!adotanteToUpdate) {
        return { success: false, message: "Adotante não encontrado" }
      }
      Object.assign(adotanteToUpdate, adotante)
      await this.repository.save(adotanteToUpdate)

      return { success: true }
    } catch (error) {
      console.log(error);
      return { success: false, message: "Erro ao atualizar o adotante" }
    }
  }
}