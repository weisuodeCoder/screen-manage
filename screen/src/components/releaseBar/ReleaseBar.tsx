import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { TimeRangeEnum } from "@/views/home/index.api";
import ReleaseSelectBox from "./ReleaseSelectBox";

interface YDatasImpl {
  name: string;
  colors: [string, string];
  datas: string[];
}

export interface ReleaseDatasImpl {
  xDatas: string[];
  yDatas: YDatasImpl[];
}

interface PropsImpl {
  datas: ReleaseDatasImpl;
  defaultSelected: TimeRangeEnum.M1;
  preLeftTwoDatas: (timeRange: TimeRangeEnum) => Promise<ReleaseDatasImpl>;
}

export default function ReleaseBar({
  datas,
  defaultSelected,
  preLeftTwoDatas,
}: PropsImpl) {
  let chart: echarts.ECharts | null = null;
  const chartRef = useRef<HTMLDivElement>(null);
  const [option, setOption] = useState({
    backgroundColor: "transparent",
    grid: {
      left: "1%",
      right: "15%",
      top: "25%",
      bottom: "5%",
      width: "100%",
      heigth: "100%",
      containLabel: true,
    },
    legend: {
      type: "scroll",
      top: "0",
      orient: "horizontal",
      textStyle: {
        color: "#fff",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        shadowStyle: { opacity: 0 },
      },
      backgroundColor: "rgba(0,0,0,1)",
      borderWidth: 1,
      borderColor: "#999999",
      textStyle: {
        color: "#ffffff",
        fontSize: 10,
      },
      extraCssText: "z-index: 9999;",
      appendToBody: true,
    },
    xAxis: [
      {
        type: "category",
        interval: 0,
        axisLine: {
          show: false,
          lineStyle: {
            color: "#435459",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: "#ffffff",
          fontSize: 10,
          interval: 0,
          padding: [0, 0, 0, 0],
        },
        data: datas.xDatas,
      },
    ],
    yAxis: {
      type: "value",
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: [2, 2],
          dashOffset: 5,
          color: ["rgba(255, 255, 255, 1)"],
          opacity: 1,
          width: 0.3,
        },
      },
      axisLabel: {
        formatter: "{value}",
        color: "#ffff",
      },
    },
    series: datas.yDatas?.map((item) => {
      return {
        name: item.name,
        data: item.datas,
        type: "bar",
        barWidth: 10,
        barGap: 1,
        label: {
          show: true,
          position: "top",
          distance: 10,
          color: "#ffffff",
          fontSize: 8,
          formatter: "{c}",
        },
        itemStyle: {
          borderRadius: 0,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: item.colors[0] },
            { offset: 1, color: item.colors[1] },
          ]),
        },
      };
    }),
  });

  const onChange = async (value: TimeRangeEnum) => {
    const res = await preLeftTwoDatas(value);

    // 更新option
    const newOption = {
      ...option,
      xAxis: [{ ...option.xAxis[0], data: res.xDatas }],
      series: res.yDatas?.map((item) => ({
        name: item.name,
        data: item.datas,
        type: "bar",
        barWidth: 10,
        barGap: 1,
        label: {
          show: true,
          position: "top",
          distance: 10,
          color: "#ffffff",
          fontSize: 8,
          formatter: "{c}",
        },
        itemStyle: {
          borderRadius: 0,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: item.colors[0] },
            { offset: 1, color: item.colors[1] },
          ]),
        },
      })),
    };

    setOption(newOption);
    chart?.setOption(option);
  };

  useEffect(() => {
    if (chartRef.current) {
      chart = echarts.init(chartRef.current);
      chart.setOption(option);
    }
  }, [option]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <ReleaseSelectBox defaultValue={defaultSelected} onChange={onChange} />
      <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
}
