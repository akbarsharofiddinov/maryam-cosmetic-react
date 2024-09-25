import React, { useEffect, useState } from "react";
import { Pagination } from "antd";

// Products images

// Component: Product Item
import ProductItem from "./ProductItem";
import { useGetAllProductsQuery } from "@/store/RTKQuery";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { setCurrentPage } from "@/store/Products/productSlice";

const Products: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPageState, setCurrentPageState] = useState(1);

  const dispatch = useAppDispatch();

  const { products: productData, currentPage } = useAppSelector(
    (state) => state.products
  );

  const { isLoading, isError, isSuccess, data } = useGetAllProductsQuery({
    page: currentPageState,
  });

  useEffect(() => {
    if (isSuccess) {
      setPages([]);
      for (let i = 1; i <= data.last_page; i++) {
        setPages((prev) => [...prev, i]);
      }
    }
  }, [currentPageState, isSuccess]);

  useEffect(() => {
    dispatch(setCurrentPage(currentPageState));
  }, [currentPageState]);

  return (
    <>
      <section className="section-products">
        <div className="container">
          <div className="section-title">
            <div className="products-filter">
              <div className="filter-box popular active">Ommabop</div>
              <div className="filter-box new">Yangi kelgan</div>
              <div className="filter-box special">Maxsus taklif</div>
              <div className="filter-box monthly-discount">Oylik chegirma</div>
            </div>
          </div>
          <div className="products">
            {isLoading ? (
              <>
                <div>Loading</div>
              </>
            ) : isError ? (
              <>
                <div>Error</div>
              </>
            ) : showAll ? (
              <>
                <div className="pagination-box">
                  <Pagination
                    defaultCurrent={currentPage}
                    onChange={(value) => {
                      setCurrentPageState(value);
                    }}
                    showSizeChanger={false}
                    total={pages.length * 10}
                  />
                </div>
                {productData.map((product, index) => (
                  <ProductItem
                    data={product}
                    key={`id:${index}_${product.name}`}
                  />
                ))}
              </>
            ) : (
              <>
                <div className="pagination-box">
                  <Pagination
                    defaultCurrent={currentPage}
                    onChange={(value) => {
                      setCurrentPageState(value);
                    }}
                    showSizeChanger={false}
                    total={pages.length * 10}
                  />
                </div>
                {productData.map((product, index) =>
                  index < 20 ? (
                    <ProductItem
                      data={product}
                      key={`id:${index}_${product.name}`}
                    />
                  ) : (
                    ""
                  )
                )}
              </>
            )}
            <div className="showAll-btn_wrapper">
              <button
                className="showAll-btn"
                onClick={() => {
                  setShowAll(() => !showAll);
                }}
              >
                {showAll ? "Yashirish" : "Yana ko'rsatish"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
