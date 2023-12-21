import { Estableishment } from "./estableishments";

export interface Profile {
  id:                   string;
  // createdAt:            string;
  // apdateAt:             string;
  usuario:              string;
  contrasenia:          string;
  rol:                  ROLES;
  token:                string;
  nombre:               string;
  sexo:                 string;
  nivel_institucional:  string;
  itinerancia?:         string;
  profesion:            string;
  etnia:                string;
  fecha_nacimiento:     string;
  telefono:             number;
  direccion:            string;
  correo_institucional: string;
  correo_personal:      string;
  regimen_laboral:      string;
  modalidad_laboral:    string;
  nombramiento:         string;
  area_laboral:         string;
  fecha_ingreso:        string;
  estableishment:       Estableishment;
}

export enum ROLES {
  BASIC = 'BASICO',
  SISTEM = 'SISTEMAS',
  ADMIN = 'ADMINISTRADOR',
}
