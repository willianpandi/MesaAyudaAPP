import { Category, SubCategory} from "./category";
import { Estableishment } from "./estableishments";

export interface Ticket {
  id:                 string;
  createdAt:          string;
  updateAt:           string;
  reasignadoAt:       string;
  cierreAt:           Date;
  codigo:             number;
  cedula:             string;
  nombre:             string;
  correo_electronico: string;
  telefono:           string;
  requerimiento:      string;
  descripcion:        string;
  area:               string;
  piso:               null;
  n_sala:             null;
  n_consultorio:      null;
  estado:             string;
  satisfaccion:       null;
  sugerencias:        null;
  a_oportuna:         null;
  s_problema:         null;
  subcategory:        SubCategory;
  estableishment:     Estableishment;
  soporteAsignado:    string;
  soporteReasignado:  string;
  soportePresente:    string;
  soporteComentario:  string;
  category:           Category;
  file:               Files;
  tiempoOcupado:      number;
}

export interface Files {
  id:        string;
  createdAt: string;
  updateAt:  string;
  archivo:   string;
}


export interface TicketsUser {
  id:                 string;
  codigo:             number;
  estado:             string;
  soporteAsignado:    string;
  soporteReasignado:  string;
  satisfaccion:       string;
}
