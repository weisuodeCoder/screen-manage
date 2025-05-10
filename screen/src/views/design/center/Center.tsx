import { useEffect, useRef, useState } from "react";
import "./style.less";
import Card, { DirectionEnum } from "../card/Card";
import { SlotListImpl } from "../types";

interface PropsImpl {
  slotList: [SlotListImpl];
}

export default function Center({ slotList }: PropsImpl) {
  return (
    <div className="center_main">
      <div className="center_one">{slotList[0].slot}</div>
      <div className="center_two">
        <Card
          style={{ height: "100%" }}
          direction={DirectionEnum.CENTER}
          title="这是中间"
          subtitle=""
          slot={<></>}
        />
      </div>
    </div>
  );
}
