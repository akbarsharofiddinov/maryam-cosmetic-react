import { useGetAllCategoriesQuery } from "@/store/RTKQuery";
import { InputNumber, InputNumberProps, Slider } from "antd";
import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

const Sidebar: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const { isSuccess, isError, isLoading, data } = useGetAllCategoriesQuery();

  useEffect(() => {
    if (isSuccess) {
      setCategories(data);
    }
  }, [isSuccess]);

  const minChange: InputNumberProps["onChange"] = (newValue) => {
    setMin(newValue as number);
  };

  return (
    <div className="sidebar left">
      <div className="catalogs">
        <h3 className="title">
          Katalog <FaAngleDown />
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
          Narx <FaAngleDown />
        </h3>
        <div className="price-filter">
          <Slider
            range
            defaultValue={[min, max]}
            max={1000000}
            step={10000}
            onChange={(e) => {
              setMin(e[0]);
              setMax(e[1]);
            }}
          />
          <div className="filter-inputs">
            <InputNumber
              min={0}
              max={1000000}
              value={min}
              onChange={(e) => minChange(e!)}
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
