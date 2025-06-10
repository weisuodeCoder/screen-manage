import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import "./style.less";
import HorizontalSelectBox from "./HorizontalSelectBox";

interface Props {
  datas: any[];
  defaultValue: "1" | "2";
  preRightThreeDatas: (value: "1" | "2") => Promise<any[]>;
}

export default function FadeLine({
  datas,
  defaultValue,
  preRightThreeDatas,
}: Props) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<echarts.ECharts | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const itemHeight = 50;
  const visibleCount = Math.floor(containerHeight / itemHeight);

  useEffect(() => {
    /** 计算父盒子高度 */
    const updateContainerHeight = () => {
      const parentElement = chartRef.current?.closest(".card_main");
      if (parentElement) {
        const height = parentElement.clientHeight;
        setContainerHeight(height);
      }
    };

    updateContainerHeight();

    window.addEventListener("resize", updateContainerHeight);

    return () => {
      window.removeEventListener("resize", updateContainerHeight);
    };
  }, []);

  const [option, setOption] = useState({
    backgroundColor: "transparent",
    grid: {
      left: "5%",
      top: "10%",
      width: "90%",
      height: "86%",
      containLabel: true,
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
          show: true,
          verticalAlign: "middle",
          margin: 16,
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

  const onChange = async (value: "1" | "2") => {
    const res = await preRightThreeDatas(value);

    setCurrentIndex(0);
    const series_0_data =
      res?.map((item) => {
        return {
          value: item.value,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: item.colorOne },
              { offset: 1, color: item.colorTwo },
            ]),
          },
        };
      }) || [];
    const newOption = {
      ...option,
      yAxis: [
        { ...option.yAxis[0], data: res?.map((item) => item.name) || [] },
        { ...option.yAxis[1] },
      ],
      color: datas?.map((item) => item.colorOne) || undefined,
      series: [
        { ...option.series[0], data: series_0_data },
        { ...option.series[1] },
      ],
    };

    setOption(newOption);
    chart?.setOption(newOption);

    // 数据更新后重新初始化轮播
  };

  useEffect(() => {
    if (chartRef.current) {
      const newChart = echarts.init(chartRef.current);
      setChart(newChart);

      updateChartData(newChart, 0);

      return () => {
        newChart.dispose();
      };
    }
  }, []);

  const updateChartData = (
    chartInstance: echarts.ECharts,
    startIndex: number
  ) => {
    const displayData = [];
    for (let i = 0; i < visibleCount; i++) {
      const dataIndex = (startIndex + i) % datas.length;
      displayData.push(datas[dataIndex]);
    }

    const newOption = {
      ...option,
      yAxis: [
        {
          ...option.yAxis[0],
          data: displayData.map((item) => item.name),
        },
      ],
      series: [
        {
          ...option.series[0],
          data: displayData.map((item) => ({
            value: item.value,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                { offset: 0, color: item.colorOne },
                { offset: 1, color: item.colorTwo },
              ]),
            },
          })),
        },
      ],
    };

    chartInstance.setOption(newOption);
  };

  useEffect(() => {
    if (!chart || datas.length <= visibleCount) return;

    let isScrolling = true;
    let scrollInterval: NodeJS.Timeout;

    const startScroll = () => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % datas.length;
        updateChartData(chart, nextIndex);
        return nextIndex;
      });

      scrollInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % datas.length;
          updateChartData(chart, nextIndex);
          return nextIndex;
        });
      }, 3000);
    };

    const handleMouseEnter = () => {
      isScrolling = false;
      clearInterval(scrollInterval);
    };

    const handleMouseLeave = () => {
      if (!isScrolling) {
        isScrolling = true;
        startScroll();
      }
    };

    const container = chartRef.current?.parentElement;
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    startScroll();

    return () => {
      clearInterval(scrollInterval);
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [chart, datas, visibleCount]);

  return (
    <div className="horizontal-bar-container" style={{ height: "100%" }}>
      <HorizontalSelectBox defaultValue={defaultValue} onChange={onChange} />
      <div style={{ width: "100%", height: "100%", paddingTop: "1.8vh" }}>
        <div ref={chartRef} className="chart-wrapper"></div>
      </div>
    </div>
  );
}
