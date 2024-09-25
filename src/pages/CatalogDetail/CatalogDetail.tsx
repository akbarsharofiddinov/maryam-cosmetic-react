import React, { useEffect, useState } from "react";
import { CatalogSidebar, NavigationBar, ProductItem } from "@/components";
import { useGetProductsByCategoryQuery } from "@/store/RTKQuery";

const CatalogDetail: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [sliderValue, setSliderValue] = useState<number[]>([20000, 300000]);
  const params = Number.parseInt(window.location.search.slice(4));
  const { isLoading, isError, isSuccess, data } = useGetProductsByCategoryQuery(
    {
      categoryId: params,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      setProducts(data.data);
    }
  }, [isSuccess, sliderValue]);

  return (
    <>
      <div className="catalog-detail">
        <div className="container">
          <NavigationBar />
          <div className="section-title">
            <h3 className="title">Макияж</h3>
          </div>

          <div className="main-content">
            <CatalogSidebar
              sliderValue={sliderValue}
              setSliderValue={setSliderValue}
            />
            <div className="products right">
              {isLoading ? (
                <div>Lodaing</div>
              ) : isError ? (
                <div>Erro</div>
              ) : (
                products.map((product, index) =>
                  product.price >= sliderValue[0] &&
                  product.price <= sliderValue[1] ? (
                    <ProductItem key={index} data={product} />
                  ) : (
                    ""
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogDetail;
