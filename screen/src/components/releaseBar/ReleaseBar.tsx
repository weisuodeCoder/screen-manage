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
  defaultSelected: "1" | "2" | "3";
  preLeftTwoDatas: (timeRange: "1" | "2" | "3") => Promise<ReleaseDatasImpl>;
}

export default function ReleaseBar({
  datas,
  defaultSelected,
  preLeftTwoDatas,
}: PropsImpl) {
  let chart: echarts.ECharts | null = null;
  const chartRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // @ts-ignore
  const intervalRef = useRef<NodeJS.Timeout>();
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
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#aaa",
      textStyle: {
        color: "#333",
        fontSize: 10,
      },
      extraCssText: "z-index: 9999;",
      appendToBody: true,
      // 保留原有的tooltip配置，不添加show: false等限制
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

  // 显示指定数据点的tooltip
  const showTooltip = (dataIndex: number) => {
    if (chart && datas.xDatas.length > 0) {
      // 先隐藏所有tooltip
      chart.dispatchAction({
        type: "hideTip",
      });

      // 显示指定tooltip
      chart.dispatchAction({
        type: "showTip",
        seriesIndex: 0, // 显示第一个系列的tooltip
        dataIndex: dataIndex,
      });
    }
  };

  const cycleTooltips = () => {
    if (datas.xDatas.length === 0) return;

    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % datas.xDatas.length;
      showTooltip(nextIndex);
      return nextIndex;
    });
  };

  // 初始化轮播
  const initTooltipCycle = () => {
    // 清除已有定时器
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      // @ts-ignore
      intervalRef.current = undefined; // 确保引用被清除
    }

    // 500ms后开始显示
    setTimeout(() => {
      if (datas.xDatas.length > 0) {
        showTooltip(0);
      }

      // 设置3秒轮播（确保只有一个 interval）
      intervalRef.current = setInterval(cycleTooltips, 3000);
    }, 500);
  };

  useEffect(() => {
    if (chartRef.current) {
      chart = echarts.init(chartRef.current);
      chart.setOption(option);

      // 初始化tooltip轮播
      initTooltipCycle();

      // 鼠标进入时暂停轮播
      chart.getZr().on("mouseover", () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      });

      // 鼠标离开时恢复轮播
      chart.getZr().on("mouseout", () => {
        initTooltipCycle();
      });

      return () => {
        // 清除定时器
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        chart?.dispose();
      };
    }
  }, [option, datas.xDatas]);

  const onChange = async (value: "1" | "2" | "3") => {
    const res = await preLeftTwoDatas(value);

    // 重置当前索引
    setCurrentIndex(0);

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
    chart?.setOption(newOption);

    // 数据更新后重新初始化轮播
    initTooltipCycle();
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <ReleaseSelectBox defaultValue={defaultSelected} onChange={onChange} />
      <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
}
