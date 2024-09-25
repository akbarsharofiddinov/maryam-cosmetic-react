import React from "react";

// Images
import announcement1 from "@/images/announcement/image 1.png";
import announcement2 from "@/images/announcement/image 2.png";
import announcement3 from "@/images/announcement/image 3.png";
import announcement4 from "@/images/announcement/image 4.png";

const Announcement: React.FC = () => {
  return (
    <>
      <section className="announcement-banner">
        <div className="container">
          <div className="section-inner">
            <div className="left">
              <p>
                <span>В воскресенье</span> скидка <span>25%</span> на все средства по уходу
                за волосами.
              </p>
            </div>
            <div className="images">
              <img src={announcement1} alt="Announcement Images" />
              <img src={announcement2} alt="Announcement Images" />
              <img src={announcement3} alt="Announcement Images" />
              <img src={announcement4} alt="Announcement Images" />
            </div>

            <div className="mobile-image">
              <img
                src="./src/images/announcement/mobile/image.png"
                alt="announcement image"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Announcement;
