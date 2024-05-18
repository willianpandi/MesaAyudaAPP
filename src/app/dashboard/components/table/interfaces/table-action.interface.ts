export enum Table {
  EDITAR,
  DETALLE,
  ENCUESTA
}

export interface TableAction<T = any> {
  action: Table;
  row: T;
}
