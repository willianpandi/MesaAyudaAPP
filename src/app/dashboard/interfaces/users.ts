import { Estableishment } from "./estableishments";

export interface User {
  id:                   string;
  createdAt:            string;
  updateAt:             string;
  usuario:              string;
  contrasenia:          string;
  rol:                  string;
  estado:               boolean;
  nombre:               string;
  puesto:               string;
  f_ingreso:            Date;
  g_Ocupacional:        string;
  m_contrato:           string;
  celular:              string;
  telefono:             string;
  correo_institucional: string;
  correo_personal:      string;
  c_Administrativo:     string;
  funciones_A:          string;
  observaciones:          string;
}

