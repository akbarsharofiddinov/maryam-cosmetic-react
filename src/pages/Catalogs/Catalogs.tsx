import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import {
  setCategories,
  setCurrentCategoryName,
} from "@/store/Products/productSlice";
import { useGetAllCategoriesQuery } from "@/store/RTKQuery";
import React, { useEffect, useState } from "react";

// Catalog images

import category1 from "@/images/catalog/image-1.png";
import category2 from "@/images/catalog/image-2.png";
import category3 from "@/images/catalog/image-3.png";
import category4 from "@/images/catalog/image-4.png";

const Catalogs: React.FC = () => {
  const [categoriesData, setCategoriesData] = useState<ICategory[]>([]);
  const { data, isLoading, isError, isSuccess } = useGetAllCategoriesQuery();
  const { categories } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      setCategoriesData(data);
      dispatch(setCategories(data));
    }
  }, [isSuccess]);

  return (
    <>
      <section className="catalog-page section-catalog">
        <div className="container">
          <div className="section-title">
            <h3 className="title">Каталог</h3>
          </div>
          <div className="catalogs-grid">
            {isLoading ? (
              <div>Loading</div>
            ) : isError ? (
              <div>Error</div>
            ) : isSuccess ? (
              categoriesData.map((category, index) => (
                <div className="catalog" key={index}>
                  <a
                    href={`/catalog-details/?id=${category.id}`}
                    onClick={() => {
                      localStorage.setItem("current-category", category.name);
                      dispatch(setCurrentCategoryName(category.name));
                    }}
                  ></a>
                  {category.name}
                  {index % 4 === 0 ? (
                    <img src={category4} alt="catalog image" />
                  ) : index % 3 === 0 && index % 5 === 0 ? (
                    <img src={category3} alt="catalog image" />
                  ) : index % 2 === 0 ? (
                    <img src={category2} alt="catalog image" />
                  ) : index % 5 === 1 || index % 3 === 1 ? (
                    <img src={category1} alt="catalog image" />
                  ) : (
                    <img src={category3} alt="" />
                  )}
                </div>
              ))
            ) : (
              <div>No Data</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Catalogs;
