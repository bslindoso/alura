import EspeciesEnum from "../enum/EspeciesEnum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class PetEntity {

  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nome: string;
  @Column()
  dataDeNascimento: Date;
  @Column()
  especie: EspeciesEnum;
  @Column()
  adotado: boolean;
}