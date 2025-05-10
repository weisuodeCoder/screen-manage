import { useState } from "react";
import "./style.less";

export default function DataListCard() {
  const [datas, setDatas] = useState<{ name: string; value: number }[]>([
    { name: "总数1", value: 383 },
    { name: "总数2", value: 383 },
    { name: "总数3", value: 383 },
    { name: "总数4", value: 383 },

    { name: "数据1", value: 383 },
    { name: "数据1", value: 383 },
    { name: "数据1", value: 383 },
    { name: "数据1", value: 383 },
    { name: "数据2", value: 383 },
    { name: "数据2", value: 383 },
    { name: "数据2", value: 383 },
    { name: "数据2", value: 383 },
    { name: "数据3", value: 383 },
    { name: "数据3", value: 383 },
    { name: "数据3", value: 383 },
    { name: "数据3", value: 383 },
  ]);
  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className="data_list_card_main"
    >
      {datas.map((item) => (
        <div className="item">
          <div className="item_icon"></div>
          <div className="item_name">{item.name}</div>
          <div className="item_value">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
