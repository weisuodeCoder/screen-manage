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
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const tooltipInterval = useRef<NodeJS.Timeout | null>(null);
  const currentTooltipIndex = useRef<number>(0);

  const [option, setOption] = useState({
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        const data = params.data;
        let tipContent = `
          <div style="font-weight:bold;margin-bottom:5px;">${data.title}</div>
          <div style="display:flex;justify-content:space-between;">
            <span>${data.name}:</span>
            <span style="font-weight:bold;margin-left:10px;">${data.value}</span>
          </div>
        `;
        return tipContent;
      },
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
            color: item.color,
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
          color: "#fff",
          fontSize: 12,
          formatter: "{b}",
        },
      },
    ],
  });

  const showTooltip = (index: number) => {
    if (chartInstance.current) {
      chartInstance.current.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: index,
      });
    }
  };

  const startTooltipCycle = () => {
    if (datas.datas.length === 0) return;

    // Clear any existing interval
    if (tooltipInterval.current) {
      clearInterval(tooltipInterval.current);
    }

    // Show first tooltip after 500ms
    setTimeout(() => {
      showTooltip(0);
      currentTooltipIndex.current = 0;

      // Then cycle every 3 seconds
      tooltipInterval.current = setInterval(() => {
        currentTooltipIndex.current =
          (currentTooltipIndex.current + 1) % datas.datas.length;
        showTooltip(currentTooltipIndex.current);
      }, 3000);
    }, 500);
  };

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
      chartInstance.current.setOption(option);
      startTooltipCycle();
    }

    return () => {
      if (tooltipInterval.current) {
        clearInterval(tooltipInterval.current);
      }
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, [option, datas.datas]);

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
