export interface IMenu {
  label: string;
  icon: string;
  to?: string;
  dropdown?: IMenu[];
}
