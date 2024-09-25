import { useAppSelector } from "@/store/hooks/hooks";

import { formatter } from "@/utils/formatString";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MyOrders: React.FC = () => {
  const [historyData, setHistoryData] = useState<IHistory[]>([]);
  const [loading, setLoading] = useState(false);

  const { userToken } = useAppSelector((state) => state.maryam);

  async function getHistoryOrders() {
    try {
      if (userToken) {
        setLoading(true);
        const response = await axios.get(
          "https://maryam.webclub.uz/api/orders",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (response.status === 200) {
          setLoading(false);
          console.log(response.data);
          setHistoryData(response.data);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getHistoryOrders();
  }, [userToken]);

  return (
    <>
      <div className="my-orders">
        <div className="container">
          <div className="section-title">
            <h3 className="title">Мои заказы</h3>
          </div>

          <div className="page-inner">
            <div className="order-boxes">
              {loading ? (
                <div>Loading</div>
              ) : historyData.length > 0 ? (
                historyData.map((item, index) => (
                  <div className="order-box" key={index}>
                    <div className="top">
                      <p>Заказ-ID: {item.id}</p>
                      <p>
                        Общая стоимость: <span>{formatter(item.total)}</span>{" "}
                        сумм
                      </p>
                    </div>
                    <div className="ordered-products products">
                      {item.order_items.map((orderItem, index) => (
                        <div
                          className="order-item"
                          key={`${orderItem.quantity}-${index}`}
                        >
                          <img
                            src={`https://maryam.webclub.uz/${orderItem.product.image_url}`}
                            alt=""
                          />
                          <div className="body">
                            <h4>{orderItem.product.name}</h4>
                            <p>{formatter(orderItem.product.price)} сумм</p>
                            <p>Количество: {orderItem.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
