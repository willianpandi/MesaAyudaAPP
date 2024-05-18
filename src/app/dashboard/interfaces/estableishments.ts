import { District } from "./districts";

export interface Estableishment {
  id:             string;
  createdAt:      string;
  updateAt:       string;
  estado:         boolean;
  codigo:         string;
  nombre:         string;
  district:       District;
}


