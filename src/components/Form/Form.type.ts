export interface Category {
  name: string;
  categories?: Category[];
}

export interface FormValue {
  categories: Category[];
}
