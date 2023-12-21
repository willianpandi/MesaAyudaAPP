import { Estableishment } from "src/app/dashboard/interfaces/estableishments";

export interface User {
  id:          number;
  createdAt:   string;
  apdateAt:    string;
  usuario:     string;
  contrasenia: string;
  rol:         string;
  estado:               boolean;
  nombre:               string;
  sexo:                 string;
  nivel_institucional:  string;
  itinerancia:          string;
  profesion:            string;
  etnia:                string;
  fecha_nacimiento:     Date;
  telefono:             string;
  direccion:            string;
  correo_institucional: string;
  correo_personal:      string;
  regimen_laboral:      string;
  modalidad_laboral:    string;
  nombramiento:         string;
  area_laboral:         string;
  fecha_ingreso:        Date;
  estableishment:       Estableishment;

}

