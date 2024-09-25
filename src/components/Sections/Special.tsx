import React from "react";

// Special images
import special1 from "@/images/special/image-1.png";
import special2 from "@/images/special/image-2.png";
import special3 from "@/images/special/image-3.png";
import special4 from "@/images/special/image-4.png";

const Special: React.FC = () => {
  return (
    <>
      <section className="section-special">
        <div className="container">
          <div className="section-title">
            <h3 className="title">Товары специально для вас</h3>
          </div>
          <div className="special-menu">
            <div className="special-box box-1">
              <h3 className="title">Скидки</h3>
              <img src={special1} alt="special image" />
            </div>
            <div className="special-box box-2">
              <h3 className="title">Новинки</h3>
              <img src={special2} alt="special image" />
            </div>
            <div className="special-box box-3">
              <h3 className="title">Месячные скидки</h3>
              <img src={special3} alt="special image" />
            </div>
            <div className="special-box box-4">
              <h3 className="title">Специальные предложения</h3>
              <img src={special4} alt="special image" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Special;
