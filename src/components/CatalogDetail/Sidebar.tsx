import { useGetAllCategoriesQuery } from "@/store/RTKQuery";
import { InputNumber, Slider } from "antd";
import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

const Sidebar: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [sliderValue, setSliderValue] = useState<number[]>([20000, 400000]);

  const { isSuccess, isError, isLoading, data } = useGetAllCategoriesQuery();

  useEffect(() => {
    if (isSuccess) {
      setCategories(data);
    }
  }, [isSuccess]);

  return (
    <div className="sidebar left">
      <div className="catalogs">
        <h3 className="title">
          Каталог <FaAngleDown />
        </h3>
        <ul className="menu">
          {isLoading ? (
            <div>Loading</div>
          ) : isError ? (
            <div>Error</div>
          ) : (
            categories.map((category, index) => (
              <li className="menu-item" key={`${index}_${category.id}`}>
                <a href={`/catalog-detail/?id=${category.id}`}>
                  {category.name}
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="price">
        <h3 className="title">
          Цена <FaAngleDown />
        </h3>
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
              onChange={(e) => setSliderValue([e || 0, sliderValue[1]])}
              step={10000}
            />

            <InputNumber
              min={0}
              max={1000000}
              value={sliderValue[1]}
              onChange={(e) => setSliderValue([sliderValue[1], e || 0])}
              step={10000}
            />
          </div>
        </div>
      </div>
      <div className="brands"></div>
      <div className="manufactures"></div>
    </div>
  );
};

export default Sidebar;
