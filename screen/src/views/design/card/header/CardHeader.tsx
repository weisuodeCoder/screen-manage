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
        {title}
        <div
          className={classNames(
            "header_sub_title",
            `header_sub_title_${direction}`
          )}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
}
