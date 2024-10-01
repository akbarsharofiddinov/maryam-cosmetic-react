import React, { useEffect, useState } from "react";
import {
  CatalogSidebar,
  Modal,
  NavigationBar,
  ProductItem,
} from "@/components";
import {
  useGetAllCategoriesQuery,
  useGetProductsByCategoryQuery,
} from "@/store/RTKQuery";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { setCurrentCategoryName } from "@/store/Products/productSlice";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { InputNumber, Slider } from "antd";
import { setModal } from "@/store/maryamSlice/maryamSlice";

const CatalogDetail: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [sliderValue, setSliderValue] = useState<number[]>([20000, 300000]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const { currentCategoryName } = useAppSelector((state) => state.products);

  const params = Number.parseInt(window.location.search.slice(4));
  const dispatch = useAppDispatch();

  const { isLoading, isError, isSuccess, data } = useGetProductsByCategoryQuery(
    {
      categoryId: params,
    }
  );

  const { isLoading: isCategoriesLoading, data: Categories } =
    useGetAllCategoriesQuery();

  const { modal } = useAppSelector((state) => state.maryam);

  useEffect(() => {
    if (isSuccess) {
      setProducts(data.data);
    }
  }, [isSuccess, sliderValue]);

  useEffect(() => {
    dispatch(
      setCurrentCategoryName(localStorage.getItem("current-category") + "")
    );
  }, [data]);

  useEffect(() => {
    setCategories(Categories);
  }, [Categories]);

  return (
    <>
      <div className="catalog-detail">
        <div className="container">
          <NavigationBar />

          <div className="section-title">
            <h3 className="title">{currentCategoryName}</h3>
          </div>

          <div className="filter-btn" onClick={() => dispatch(setModal(true))}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.16667 3.83334C2.16667 3.14298 2.72631 2.58334 3.41667 2.58334C4.10702 2.58334 4.66667 3.14298 4.66667 3.83334C4.66667 4.5237 4.10702 5.08334 3.41667 5.08334C2.72631 5.08334 2.16667 4.5237 2.16667 3.83334ZM3.41667 0.916672C1.80583 0.916672 0.5 2.22251 0.5 3.83334C0.5 5.44417 1.80583 6.75001 3.41667 6.75001C5.0275 6.75001 6.33333 5.44417 6.33333 3.83334C6.33333 2.22251 5.0275 0.916672 3.41667 0.916672ZM8 4.66667H14.6667V3.00001H8V4.66667ZM11.3333 12.1667C11.3333 11.4763 11.893 10.9167 12.5833 10.9167C13.2737 10.9167 13.8333 11.4763 13.8333 12.1667C13.8333 12.857 13.2737 13.4167 12.5833 13.4167C11.893 13.4167 11.3333 12.857 11.3333 12.1667ZM12.5833 9.25001C10.9725 9.25001 9.66667 10.5558 9.66667 12.1667C9.66667 13.7775 10.9725 15.0833 12.5833 15.0833C14.1942 15.0833 15.5 13.7775 15.5 12.1667C15.5 10.5558 14.1942 9.25001 12.5833 9.25001ZM1.33333 11.3333V13H8V11.3333H1.33333Z"
                fill="#202024"
              />
            </svg>
            Фильтр
          </div>

          {/* Filter Modal */}
          {modal ? (
            <Modal>
              <div className="top">
                <FaArrowLeft />
                <span>Filterlash</span>
                <IoCloseSharp onClick={() => dispatch(setModal(false))} />
              </div>
              <div className="filter-box">
                <div className="price">
                  <h3 className="title">Цена</h3>
                  <div className="price-filter">
                    <Slider
                      range
                      defaultValue={sliderValue}
                      value={sliderValue}
                      max={500000}
                      step={10000}
                      onChange={(e) => setSliderValue(e)}
                    />
                    <div className="filter-inputs">
                      <InputNumber
                        min={0}
                        max={1000000}
                        value={sliderValue[0]}
                        onChange={(e) =>
                          setSliderValue([e || 0, sliderValue[1]])
                        }
                        step={10000}
                      />

                      <InputNumber
                        min={0}
                        max={1000000}
                        value={sliderValue[1]}
                        onChange={(e) =>
                          setSliderValue([sliderValue[1], e || 0])
                        }
                        step={10000}
                      />
                    </div>
                  </div>
                </div>
                <div className="catalog">
                  <h3 className="title">Каталог</h3>
                  <div className="select-item">
                    <div className="selected">
                      {currentCategoryName} <FaArrowDown />
                    </div>
                    <div className="menu">
                      {isCategoriesLoading ? (
                        <div>Loading</div>
                      ) : Categories ? (
                        categories.map((category, index) => (
                          <div className="menu-item" key={index}>
                            {category.name}
                          </div>
                        ))
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          ) : (
            ""
          )}

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
