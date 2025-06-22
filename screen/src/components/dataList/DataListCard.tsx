import { useState } from "react";
import "./style.less";

interface PropsImpl {
  datas: any[];
}

export default function DataListCard({ datas }: PropsImpl) {
  datas = datas.map((item) => ({
    ...item,
    names: item.name.match(/.{1,5}/g) || [],
  }));
  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className="data_list_card_main"
    >
      {datas.map((item, index) => (
        <div className="item" key={index}>
          <div className="item_icon"></div>
          <div className="item_name">
            {item.value}
            &nbsp;
            {item.unit}
          </div>
          <div
            className="item_value"
            style={{
              fontSize: item.names.length === 1 ? "0.85vw" : "0.7vw",
            }}
          >
            {item.names.map((line: any, i: number) => (
              <span
                key={i}
                style={{
                  lineHeight: item.names.length > 1 ? "1.1" : "1",
                }}
              >
                {line}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
