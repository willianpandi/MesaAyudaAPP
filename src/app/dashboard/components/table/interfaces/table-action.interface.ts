export enum Table {
  EDITAR,
  ELIMINAR,
}


export interface TableAction<T = any> {
  action: Table;
  row: T;
}
