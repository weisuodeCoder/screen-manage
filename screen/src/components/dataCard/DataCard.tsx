import { useEffect, useRef, useState } from "react";
import "./style.less";
import * as echarts from "echarts";

export default function DataCard() {
  const chartRef = useRef<HTMLDivElement>(null);

  const [option, setOption] = useState({
    backgroundColor: "transparent",
    // title: {
    //   text: "Referer of a Website",
    //   subtext: "Fake Data",
    //   left: "center",
    // },
    // tooltip: {
    //   trigger: "item",
    // },
    // legend: {
    //   orient: "vertical",
    //   left: "left",
    // },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "数据1" },
          { value: 735, name: "数据2" },
          { value: 580, name: "数据3" },
          { value: 484, name: "数据4" },
          { value: 300, name: "数据5" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "#ffffff",
          },
        },
      },
    ],
  });

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption(option);
    }
  }, [option]);
  return (
    <div className="data_card_main">
      <div className="data_card_1">
        <div className="c_1_title">本月工单数</div>
        <div className="c_1_content">
          <span style={{ color: "#f3b155" }}>90</span>/666
        </div>
      </div>
      <div className="data_card_2">
        <div className="card_item">
          <div className="i_title">社区</div>
          <div className="i_content">
            <span style={{ color: "#f3b155" }}>90</span>/666
          </div>
        </div>
        <div className="card_item">
          <div className="i_title">物业</div>
          <div className="i_content">
            <span style={{ color: "#f3b155" }}>90</span>/666
          </div>
        </div>
      </div>
      <div className="data_card_3">
        <div ref={chartRef} className="c_3_chart"></div>
      </div>
    </div>
  );
}
