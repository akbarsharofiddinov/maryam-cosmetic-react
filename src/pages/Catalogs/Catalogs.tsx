import { useAppDispatch } from "@/store/hooks/hooks";
import { setCategories } from "@/store/Products/productSlice";
import { useGetAllCategoriesQuery } from "@/store/RTKQuery";
import React, { useEffect, useState } from "react";

// Catalog images

import category1 from "@/images/catalog/image-1.png";

const Catalogs: React.FC = () => {
  const [categoriesData, setCategoriesData] = useState<ICategory[]>([]);
  const dispatch = useAppDispatch();
  const { data, isLoading, isError, isSuccess } = useGetAllCategoriesQuery();

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
                  <a href={`/catalog-details/?id=${category.id}`}></a>
                  {category.name}
                  <img src={category1} alt="catalog image" />
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
