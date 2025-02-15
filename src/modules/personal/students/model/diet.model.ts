export interface IDiet {
  student_id: number;
  diet: string;
  user_id?: number;
}

export interface IDietFormSearch {
  objective: string;
  price: string;
  sex: string;
  restriction: string;
}
