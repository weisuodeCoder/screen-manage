import { useEffect, useRef, useState } from "react";
import "./style.less";
import { DirectionEnum } from "../Card";
import classNames from "classnames";

interface PropsImpl {
  direction: DirectionEnum;
  title: string;
  subtitle: string;
}

export default function CardHeader({ direction, title, subtitle }: PropsImpl) {
  return (
    <div className="card_header_main">
      <div className={classNames("header_bg", `header_bg_${direction}`)}></div>
      <div className={classNames("header_title", `header_title_${direction}`)}>
        <div
          className={classNames(
            "animate__animated",
            `${
              direction === DirectionEnum.LEFT
                ? "animate__lightSpeedInLeft"
                : "animate__lightSpeedInRight"
            }`
          )}
        >
          {title}
        </div>
        <div
          className={classNames(
            "header_sub_title",
            `header_sub_title_${direction}`,
            "animate__animated",
            `${
              direction === DirectionEnum.LEFT
                ? "animate__lightSpeedInLeft"
                : "animate__lightSpeedInRight"
            }`
          )}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
}
