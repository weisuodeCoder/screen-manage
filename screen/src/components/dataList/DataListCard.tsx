import { useState } from "react";
import "./style.less";

interface PropsImpl {
  datas: any[];
}

export default function DataListCard({ datas }: PropsImpl) {
  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className="data_list_card_main"
    >
      {datas.map((item, index) => (
        <div className="item" key={index}>
          <div className="item_icon"></div>
          <div className="item_name">{item.value}</div>
          <div className="item_value">{item.name}</div>
        </div>
      ))}
    </div>
  );
}
