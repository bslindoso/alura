import EspeciesEnum from "../enum/EspeciesEnum";

type petType = {
  id: number;
  nome: string;
  especie: EspeciesEnum;
  dataDeNascimento: Date;
  adotado: boolean;
}

export default petType;