import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const NavigationBar: React.FC = () => {
  return (
    <>
      <div className="navigation-bar">
        <Link to={"/"} className="page_link">
          Главная страница <FaAngleRight />
        </Link>
        <Link to={"/"} className="page_link">
          Скидки <FaAngleRight />
        </Link>
        <Link to={"#"} className="page_link">
          Лак цветной на водной основе ЭКО, 40 цветов.
        </Link>
      </div>
    </>
  );
};

export default NavigationBar;
