import { useEffect, useRef, useState } from "react";
import "./style.less";
import * as echarts from "echarts";

interface DatasImpl {
  value: number;
  name: string;
  gid: string;
  color: string;
  title: string;
  unit: string;
}

interface GroupImpl {
  title: string;
  value: number;
}

export interface DataCardDatasImpl {
  datas: DatasImpl[];
  group: [GroupImpl, GroupImpl];
}

interface PropsImpl {
  datas: DataCardDatasImpl;
}

export default function DataCard({ datas }: PropsImpl) {
  const chartRef = useRef<HTMLDivElement>(null);

  const [option, setOption] = useState({
    tooltip: {
      trigger: "item", // 或 'axis' 根据你的需求
      formatter: function (params: any) {
        // params 是当前触发项的数据对象
        const data = params.data; // 获取当前数据项

        // 构建 tooltip 内容
        let tipContent = `
          <div style="font-weight:bold;margin-bottom:5px;">${data.title}</div>
          <div style="display:flex;justify-content:space-between;">
            <span>${data.name}:</span>
            <span style="font-weight:bold;margin-left:10px;">${data.value}</span>
          </div>
        `;

        return tipContent;
      },
      // 可选样式配置
      backgroundColor: "rgba(255,255,255,0.9)",
      borderColor: "#ddd",
      borderWidth: 1,
      padding: [10, 15],
      textStyle: {
        color: "#333",
        fontSize: 14,
      },
    },
    backgroundColor: "transparent",
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: datas.datas.map((item) => ({
          ...item,
          itemStyle: {
            color: item.color, // 使用数据项中的color字段
          },
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "#ffffff",
          },
        },
        label: {
          color: "#fff", // 白色文字
          fontSize: 12,
          formatter: "{b}",
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
        <div className="c_1_title">总数</div>
        <div className="c_1_content">
          <span style={{ color: "#f3b155" }}>
            {(datas.group?.[0].value || 0) + (datas.group?.[1].value || 0)}
          </span>
        </div>
      </div>
      <div className="data_card_2">
        <div className="card_item">
          <div className="i_title">{datas.group?.[0].title}</div>
          <div className="i_content">
            <span style={{ color: "#f3b155" }}>{datas.group?.[0].value}</span>
          </div>
        </div>
        <div className="card_item">
          <div className="i_title">{datas.group?.[1].title}</div>
          <div className="i_content">
            <span style={{ color: "#f3b155" }}>{datas.group?.[1].value}</span>
          </div>
        </div>
      </div>
      <div className="data_card_3">
        <div ref={chartRef} className="c_3_chart"></div>
      </div>
    </div>
  );
}
