import { ReactNode, useEffect, useRef, useState } from "react";
import "./style.less";
import Card, { DirectionEnum } from "../card/Card";
import { L_R_PropsImpl } from "../types";

export default function Left({ slotList }: L_R_PropsImpl) {
  return (
    <div className="left_main">
      {slotList.map((item, index) => (
        <Card
          key={index}
          direction={DirectionEnum.LEFT}
          title={item.title}
          subtitle={item.subtitle}
          slot={item.slot}
        />
      ))}
    </div>
  );
}
