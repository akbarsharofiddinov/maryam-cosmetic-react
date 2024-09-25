interface ICategory {
  id: number;
  name: string;
  parent_id: null;
  created_at: string;
  updated_at: string;
}

interface IBrand {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface IUnit {
  id: number;
  name: string;
  short_name: string;
  created_at: null;
  updated_at: null;
}

interface IProduct {
  id: number;
  name: string;
  category_id: number;
  brand_id: number;
  unit_id: number;
  price: number;
  image_url: string;
  category: ICategory;
  brand: IBrand;
  unit: IUnit;
}

