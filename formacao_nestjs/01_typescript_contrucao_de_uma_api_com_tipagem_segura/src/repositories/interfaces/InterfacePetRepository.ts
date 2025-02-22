import petType from "../../types/petType";

export default interface InterfacePetRepository {
  criaPet(pet: petType): void;
  listaPets(): petType[] | Promise<petType[]>;
  atualizaPet(id: number, pet: petType): void;
  deletaPet(id: number, pet: petType): void;
}