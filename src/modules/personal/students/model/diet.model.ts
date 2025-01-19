export interface iDiet {
  student_id: number;
  diet: string;
  user_id?: number;
}

export interface iDietFormSearch {
  objective: string;
  price: string;
  sex: string;
  restriction: string;
}
