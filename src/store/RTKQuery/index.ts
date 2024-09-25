import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type OrderReqBody = {
  address: string;
  order_items: {
    product_id: number;
    quantity: number;
  }[];
  full_name: string;
  token: string;
};

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://maryam.webclub.uz" }),
  endpoints: (builder) => {
    return {
      // Get Pages of Products
      getAllProducts: builder.query<any, { page: number }>({
        query: ({ page }) => `/api/products?page=${page}`,
      }),

      // Get All Categories
      getAllCategories: builder.query<any, void>({
        query: () => `/api/categories`,
      }),

      // Get Products by Category
      getProductsByCategory: builder.query<any, { categoryId: number }>({
        query: ({ categoryId }) => `/api/products?category_id=${categoryId}`,
      }),

      // Auth
      // get SMS
      getVarificationCode: builder.mutation<any, { phone: string }>({
        query: ({ phone }) => ({
          url: `/api/login?phone=${phone}`,
          method: "POST",
        }),
      }),

      // Ordering
      orderProducts: builder.mutation<any, OrderReqBody>({
        query: ({ address, full_name, order_items, token }) => ({
          url: `/api/orders`,
          method: "POST",
          body: {
            address: address,
            order_items: order_items,
            full_name: full_name,
          },
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }),
      }),
    };
  },
});

export const {
  useGetAllProductsQuery,
  useGetVarificationCodeMutation,
  useGetAllCategoriesQuery,
  useGetProductsByCategoryQuery,
  useOrderProductsMutation,
} = productAPI;
