import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./style.less";
import * as echarts from "echarts";
import { IntervalWorkRef } from "@/views/type";

interface DatasImpl {
  value: number;
  name: string;
  gid: string;
  color: string;
  title: string;
  unit: string;
}

interface CountConfImpl {
  title: string;
  unit: string;
}
interface GroupImpl {
  title: string;
  value: number;
}

export interface DataCardDatasImpl {
  datas: DatasImpl[];
  group: [CountConfImpl, GroupImpl, GroupImpl];
}

interface PropsImpl {
  datas: DataCardDatasImpl;
}

const DataCard = forwardRef<IntervalWorkRef, PropsImpl>(({ datas }, ref) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const currentTooltipIndex = useRef<number>(0);
  const titleCountMap = useRef<Record<string, number>>({});
  const isMouseEnter = useRef(false);

  const [option, setOption] = useState({
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        const data = params.data;
        const total = titleCountMap.current[data.title] || 0;

        let tipContent = `
          <div style="font-weight:bold;margin-bottom:0.5vh;">${data.title}</div>
          <div style="display:flex;justify-content:space-between;">
            <span>${data.name}:</span>
            <span style=";margin-left:1vh;">${data.value}${
          data.unit ? data.unit : ""
        }</span>
          </div>
          <div>占比: ${((Number(data.value) / total) * 100).toFixed(2)}%</div>
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

  const intervalWork = () => {
    if (isMouseEnter.current) return;
    if (!datas?.datas?.length || !chartInstance.current) return;
    currentTooltipIndex.current =
      (currentTooltipIndex.current + 1) % datas.datas.length;
    showTooltip(currentTooltipIndex.current);
  };

  const onMouseEnter = () => {
    isMouseEnter.current = true;
  };

  const onMouseLeave = () => {
    isMouseEnter.current = false;
    intervalWork();
  };

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
      chartInstance.current.setOption(option);
      const map: Record<string, number> = {};
      datas?.datas?.forEach?.((item) => {
        if (map[item.title]) {
          map[item.title] += Number(item.value);
        } else {
          map[item.title] = Number(item.value);
        }
      });
      titleCountMap.current = map;
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, [option, datas.datas]);

  useImperativeHandle(ref, () => ({
    intervalWork,
  }));

  return (
    <div
      className="data_card_main"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="data_card_1">
        <div className="c_1_title">{datas.group[0].title}</div>
        <div className="c_1_content">
          <span style={{ color: "#f3b155", fontSize: "2.5vh" }}>
            {(datas.group?.[1].value || 0) + (datas.group?.[2].value || 0)}
          </span>
          <span style={{ color: "#547795", fontSize: "2.5vh" }}>
            {datas.group[0].unit}
          </span>
        </div>
      </div>
      <div className="data_card_2">
        <div className="card_item">
          <div className="i_title">{datas.group?.[1].title}</div>
          <div className="i_content">
            <span style={{ color: "#f3b155" }}>{datas.group?.[1].value}</span>
          </div>
        </div>
        <div className="card_item">
          <div className="i_title">{datas.group?.[2].title}</div>
          <div className="i_content">
            <span style={{ color: "#f3b155" }}>{datas.group?.[2].value}</span>
          </div>
        </div>
      </div>
      <div className="data_card_3">
        <div ref={chartRef} className="c_3_chart"></div>
      </div>
    </div>
  );
});

export default DataCard;
