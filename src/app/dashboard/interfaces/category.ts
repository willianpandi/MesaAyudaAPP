
export interface Category {
  id:           string;
  createdAt:    string;
  updateAt:     string;
  nombre:       string;
  descripcion:  string;
}

export interface SubCategory {
  id:        string;
  createdAt: string;
  updateAt:  string;
  nombre:    string;
  tiempo:    number;
  category:  Category;
}

export interface SmallSubCategory {
  id: string;
  nombre: string;
}




