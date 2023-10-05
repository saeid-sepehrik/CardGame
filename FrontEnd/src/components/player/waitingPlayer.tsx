import React, { useEffect } from "react";
import { setRoleGame } from "./player.slice";
import { useAppDispatch } from "../../redux/hooks";
import { Carousel } from "antd";

import { useTranslation } from "react-i18next";

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export const WaitingPlayer = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      (async function () {
        dispatch(setRoleGame());
      })();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>{t("player.carousel.message1")}</h3>
        </div>
        <div>
          <h3 style={contentStyle}>{t("player.carousel.message2")}</h3>
        </div>
        <div>
          <h3 style={contentStyle}>{t("player.carousel.message3")}</h3>
        </div>
      </Carousel>
    </>
  );
};
