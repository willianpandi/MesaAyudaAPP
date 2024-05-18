export interface TableColumn {
  label: string;
  def: string;
  dataKey: string;
  formatt?: string;
  dataType?: 'date'  | 'object' | 'boolean' | 'minutes' | 'sarvey';
  isSticky?: boolean;
  isStikyEnd? : boolean;
}
