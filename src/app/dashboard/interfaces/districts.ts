import { Estableishment } from './estableishments';

export interface District {
  id:              string;
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

export interface SmallDistrict {
  id: string;
  nombre: string;
}
