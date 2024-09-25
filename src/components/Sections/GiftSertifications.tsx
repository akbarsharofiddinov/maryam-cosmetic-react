import React from "react";

import bg1 from "@/images/gift-sertifications/card-bg-1.svg";
import bg2 from "@/images/gift-sertifications/card-bg-2.svg";
import bg3 from "@/images/gift-sertifications/card-bg-3.svg";

const GiftSertifications: React.FC = () => {
  return (
    <>
      <section className="gift-sertifications">
        <div className="container">
          <div className="section-title">
            <h3 className="title">Sovg’a sertifikatlari</h3>
          </div>
          <div className="section-inner">
            <div
              className="sertification-card"
              style={{ background: `url(${bg1})` }}
            >
              <h3 className="title">CHEGIRMA</h3>
              <div className="body">
                <div className="top">
                  <h1>25%</h1>
                  <button>Foydalanish</button>
                </div>
                <p className="desc">
                  Barcha “Parfume” mahsulotlari uchun chegirma.
                </p>
                <p className="date">21.08.2024 - 21.12.2024</p>
              </div>
            </div>
            <div
              className="sertification-card"
              style={{ background: `url(${bg2})` }}
            >
              <h3 className="title">CHEGIRMA</h3>
              <div className="body">
                <div className="top">
                  <h1>25%</h1>
                  <button>Foydalanish</button>
                </div>
                <p className="desc">
                  Barcha “Parfume” mahsulotlari uchun chegirma.
                </p>
                <p className="date">21.08.2024 - 21.12.2024</p>
              </div>
            </div>
            <div
              className="sertification-card"
              style={{ background: `url(${bg3})` }}
            >
              <h3 className="title">CHEGIRMA</h3>
              <div className="body">
                <div className="top">
                  <h1>25%</h1>
                  <button>Foydalanish</button>
                </div>
                <p className="desc">
                  Barcha “Parfume” mahsulotlari uchun chegirma.
                </p>
                <p className="date">21.08.2024 - 21.12.2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GiftSertifications;
