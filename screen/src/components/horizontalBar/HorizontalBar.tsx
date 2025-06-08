import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

interface Props {
  datas: any[];
}
export default function FadeLine({ datas }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [option, setOption] = useState({
    backgroundColor: "transparent",
    grid: {
      left: "5%",
      top: "10%",
      width: "90%",
      height: "86%",
    },
    legend: {
      top: "8%",
      icon: "circle",
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {
        color: "#90979c",
        fontSize: 12,
        lineHeight: 20,
      },
    },

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        shadowStyle: { opacity: 0.2 },
      },
      backgroundColor: "rgba(0,0,0,1)",
      borderWidth: 1,
      borderColor: "#999999",
      textStyle: {
        color: "#ffffff",
        fontSize: 10,
        lineHeight: 16,
      },
    },
    xAxis: [
      {
        type: "value",
        interval: 0,

        axisLine: {
          show: false,
          lineStyle: {
            color: "#407A80",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: "#CFDAE6",
          fontSize: 10,
          interval: 0,
        },
      },
    ],
    yAxis: [
      {
        type: "category",
        inverse: true,
        axisLabel: {
          color: "#CFDAE6",
          fontSize: 10,
          interval: 0,
          show: false,
          verticalAlign: "top",
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        data: datas?.map((item) => item.name) || [],
      },
      {
        inverse: true,
        axisLine: {
          show: false,
          lineStyle: {
            color: "rgba(0,0,0,0)",
          },
        },
        data: [],
      },
    ],
    color: datas?.map((item) => item.colorOne) || undefined,
    series: [
      {
        data:
          datas?.map((item) => {
            return {
              value: item.value,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  { offset: 0, color: item.colorOne },
                  { offset: 1, color: item.colorTwo },
                ]),
              },
            };
          }) || [],
        type: "bar",
        barWidth: 7,
        yAxisIndex: 0,
        showBackground: false,
        z: 2,
        label: {
          show: true,
          position: "middle",
          padding: [-18, 0, 0, 0],
          color: "#16C1A6",
          fontSize: 12,
          formatter: (params: any) => {
            return `{title|${
              params.name
            }}                                                                              {value|${
              params.value
            }}  {unit|${datas[params.dataIndex].unit}}`;
          },
          rich: {
            title: {
              color: "#FFFFFF",
              fontSize: 10,
            },
            value: {
              fontSize: 10,
            },
            unit: {
              color: "#717477",
              fontSize: 10,
            },
          },
        },
        itemStyle: {
          borderRadius: 0,
          borderWidth: 2,
          borderColor: "rgba(26, 57, 77,1)",
        },
      },
      {
        name: "背景",
        type: "bar",
        yAxisIndex: 1,
        barGap: "-100%",
        data: [120, 120, 120, 120],
        barWidth: 10,
        z: 0,
        itemStyle: {
          color: "none",
          borderColor: "rgba(172,191,188,0.4)",
          borderWidth: 1,
          borderRadius: 0,
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

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>;
}
