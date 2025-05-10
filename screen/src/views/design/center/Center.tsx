import { useEffect, useRef, useState } from "react";
import "./style.less";
import Card, { DirectionEnum } from "../card/Card";
import { SlotListImpl } from "../types";

interface PropsImpl {
  slotList: [SlotListImpl, SlotListImpl];
}

export default function Center({ slotList }: PropsImpl) {
  return (
    <div className="center_main">
      <div className="center_one">{slotList[0].slot}</div>
      <div className="center_two">
        {slotList[1].slot}
        {/* <Card
          style={{ height: "100%" }}
          direction={DirectionEnum.CENTER}
          title={slotList[1].title}
          subtitle={slotList[1].subtitle}
          slot={slotList[1].slot}
        /> */}
      </div>
    </div>
  );
}
