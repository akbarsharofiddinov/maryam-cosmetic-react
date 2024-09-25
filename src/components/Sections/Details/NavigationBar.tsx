import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const NavigationBar: React.FC = () => {
  return (
    <>
      <div className="navigation-bar">
        <Link to={"/"} className="page_link">
          Bosh sahifa <FaAngleRight />
        </Link>
        <Link to={'/'} className="page_link">
          Chegirmalar <FaAngleRight />
        </Link>
        <Link to={"#"} className="page_link">
          Suvga asoslangan rangli lak EKO, 40 ta rang
        </Link>
      </div>
    </>
  );
};

export default NavigationBar;
