import { Ticket } from './tickets';


export interface Directive {
  id:           string;
  createdAt:    string;
  apdateAt:     string;
  nombre:       string;
  descripcion:  string;
  rango_tiempo: string;
  tickets:      Ticket[];
}
