export interface iMenu {
  label: string;
  icon: string;
  to?: string;
  dropdown?: iMenu[];
}
