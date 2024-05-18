import { Estableishment } from './estableishments';

export interface District {
  id:              string;
  createdAt:       string;
  updateAt:        string;
  estado:          boolean;
  codigo:          string;
  nombre:          string;
  provincia:       Provincia;
  estableishments: Estableishment[];
}

export enum Provincia {
  CHIMBORAZO = "CHIMBORAZO",
  COTOPAXI = "COTOPAXI",
  PASTAZA = "PASTAZA",
  TUNGURAHUA = "TUNGURAHUA",
}

export interface SmallEstableishment {
  id: string;
  nombre: string;
}
