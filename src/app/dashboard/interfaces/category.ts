
export interface Category {
  id:           string;
  createdAt:    string;
  updateAt:     string;
  estado:       boolean;
  nombre:       string;
  descripcion:  string;
}

export interface SubCategory {
  id:        string;
  createdAt: string;
  updateAt:  string;
  estado:    boolean;
  nombre:    string;
  tiempo:    number;
  category:  Category;
}

export interface SmallSubCategory {
  id: string;
  nombre: string;
}




