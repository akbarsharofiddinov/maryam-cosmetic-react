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

interface OrderProductData {
  id: number;
  name: string;
  description: null;
  category_id: number;
  brand_id: number;
  unit_id: number;
  cost_purchase: number;
  cost: number;
  price: number;
  image: null;
  stock_alert: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  internet_magazine: number;
  image_url: string;
}

interface IOrderItem {
  id: number;
  order_id: number;
  product_id: number;
  price: number;
  quantity: number;
  total: number;
  created_at: string;
  updated_at: string;
  product: OrderProductData;
}

interface IHistory {
  id: number;
  customer_id: number;
  region_id: null;
  district_id: null;
  note: null;
  address: string;
  total: number;
  status: string;
  created_at: string;
  updated_at: string;
  order_items: IOrderItem[];
}

interface CartProduct {
  product: IProduct;
  quantity: number;
}
