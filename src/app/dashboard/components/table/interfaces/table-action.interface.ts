export enum Table {
  EDITAR,
  ELIMINAR,
  DETALLE,
}

export interface TableAction<T = any> {
  action: Table;
  row: T;
}
