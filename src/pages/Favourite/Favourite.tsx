import { ProductItem } from "@/components";
import { useAppSelector } from "@/store/hooks/hooks";
import { Empty } from "antd";
import React from "react";

const Favourite: React.FC = () => {
  const { products } = useAppSelector((state) => state.favourite);
  return (
    <>
      <div className="favourite-page">
        <div className="container">
          <div className="section-title">
            <h3 className="title">Избранное</h3>
          </div>
          <div className="favourites-box products">
            {products.length > 0 ? (
              products.map((product, index) => (
                <ProductItem key={`${product.id}_${index}`} data={product} />
              ))
            ) : (
              <div className="empty-box">
                <Empty />
                <a href="/">Вернуться к покупкам</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favourite;
