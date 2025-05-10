import { ReactNode, useEffect, useRef, useState } from "react";
import "./style.less";
import CardHeader from "./header/CardHeader";
import CardBody from "./body/CardBody";

interface PropsImpl {
  direction: DirectionEnum;
  title: string;
  subtitle: string;
  slot: ReactNode;
  style?: Record<string, any>;
}

export enum DirectionEnum {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
}

export default function Card({
  direction,
  title,
  slot,
  subtitle,
  style,
}: PropsImpl) {
  return (
    <div className="card_main" style={style}>
      <div className="card_header">
        <CardHeader direction={direction} title={title} subtitle={subtitle} />
      </div>
      <div className="card_body">
        <CardBody direction={direction} slot={slot} />
      </div>
    </div>
  );
}
