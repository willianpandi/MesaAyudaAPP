export interface TableColumn {
  label: string;
  def: string;
  dataKey: string;
  formatt?: string;
  dataType?: 'date'  | 'object' | 'boolean' | 'minutes';
  isSticky?: boolean;
  isStikyEnd? : boolean;
}
