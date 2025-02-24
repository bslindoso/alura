import AdotanteEntity from "../../entities/AdotanteEntity";

export default interface InterfaceAdotanteRepository {
  criaAdotante(adotante: AdotanteEntity): void | Promise<void>;
  listaAdotantes(): Promise<AdotanteEntity[]>;
  atualizaAdotante(id: number, adotante: AdotanteEntity): Promise<{ success: boolean, message?: string }>;
}