import { ReactNode, useEffect, useRef, useState } from "react";
import "./style.less";
import { DirectionEnum } from "../Card";
import classNames from "classnames";

interface PropsImpl {
  direction: DirectionEnum;
  slot: ReactNode;
}

export default function CardBody({ direction, slot }: PropsImpl) {
  return (
    <div
      className={classNames("card_body_main", `card_body_main_${direction}`)}
    >
      {slot}
    </div>
  );
}
