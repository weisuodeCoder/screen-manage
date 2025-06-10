import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import FadeSelectBox from "./FadeSelectBox";
import { TimeRangeThreeEnum } from "@/views/home/index.api";

interface YDatasImpl {
  name: string;
  datas: number[];
  color: string;
}

export interface FadeLineDatas {
  xDatas: string[];
  yDatas: YDatasImpl[];
}

interface PropsImpl {
  datas: FadeLineDatas;
  defaultValue: TimeRangeThreeEnum;
  preLeftThreeDatas: (timeRange: TimeRangeThreeEnum) => Promise<FadeLineDatas>;
}

export default function FadeLine({
  datas,
  defaultValue,
  preLeftThreeDatas,
}: PropsImpl) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const tooltipInterval = useRef<NodeJS.Timeout>();
  const currentTooltipIndex = useRef(0);
  const initialTimer = useRef<NodeJS.Timeout>();

  const [option, setOption] = useState({
    backgroundColor: "transparent",
    grid: {
      left: "5%",
      right: "5%",
      top: "25%",
      bottom: "5%",
      width: "90%",
      heigth: "100%",
      containLabel: true,
    },
    legend: {
      top: "0",
      textStyle: {
        color: "#ffff",
        fontSize: 12,
        lineHeight: 20,
      },
      icon: "circle",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        shadowStyle: { opacity: 0.2 },
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
      formatter: function (params: any) {
        let result = `${params[0].axisValueLabel}<br/>`;
        params.forEach((param: any) => {
          const marker = param.marker;
          const seriesName = param.seriesName;
          const value = param.value;
          if (param.componentSubType === "bar") {
            result += `${marker} ${seriesName}: ${value}<br/>`;
          } else {
            result += `${marker} ${seriesName}: ${value}<br/>`;
          }
        });
        return result;
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
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
        interval: (index: number) =>
          index % Math.ceil(datas.xDatas.length / 8) === 0,
        padding: [0, 0, 0, 0],
      },
      data: datas.xDatas,
    },
    yAxis: [
      {
        type: "value",
        min: 60,
        max: 100,
        axisLabel: {
          formatter: "{value}",
          color: "#fff",
        },
      },
    ],
    color: datas.yDatas.map((item: any) => item.color),
    series: datas.yDatas.map((item: any) => {
      return {
        name: item.name,
        data: item.datas,
        type: "line",
        smooth: true,
        symbol:
          "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAQ5JREFUOE+1la1OQ0EQRs8kCFIQdVCCxIBpCK1AInkDHC+B4QkwvASub4GsaE0NGCRpKhGFVDQZ+Mjem9vNbkphmWTMfjNnd3b2x0iYuxuwH7wNbIewBfAGzORm5nG6ElfM3QU6AXZSkzXG3oEnMxO8thWgux8DR2tAsfxiZs/VYA38Jazi1NBvYCizv+HK4vCRyrfQgIsf7Nm6+bSnjwIeAGeZaGnXQDfoE+ABmGbixwKeAoeJAMHuv3w30ubATQb6KqDKjZPEuAXOMysZAncJbS7gJbCVEAdAKwP8AK4S2vJfgMVLLt6UDtAreWx0W8od7OJXryq16OPwR2j6+WpAyz2wDagape7vARt9AZ+G3HmhiKS3xwAAAABJRU5ErkJggg==",
        symbolSize: 10,
        showSymbol: false,
        label: {
          show: true,
          position: "top",
          distance: 10,
          color: "#ffffff",
          fontSize: 8,
        },
        lineStyle: {
          shadowColor: "rgb(0, 0, 0, 0.4)",
          shadowBlur: 3,
          shadowOffsetY: 10,
          width: 3,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: `${item.color}88`,
            },
            {
              offset: 1,
              color: item.color,
            },
          ]),
        },
      };
    }),
  });

  // 自动切换Tooltip的函数
  const showNextTooltip = () => {
    if (!chartInstance.current) return;

    const dataLength = datas.xDatas.length;
    if (dataLength === 0) return;

    // 隐藏上一个Tooltip
    chartInstance.current.dispatchAction({ type: "hideTip" });

    // 显示下一个Tooltip
    currentTooltipIndex.current =
      (currentTooltipIndex.current + 1) % dataLength;
    chartInstance.current.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: currentTooltipIndex.current,
    });
  };

  const startTooltipLoop = () => {
    // 清除之前的定时器
    if (tooltipInterval.current) {
      clearInterval(tooltipInterval.current);
    }
    if (initialTimer.current) {
      clearTimeout(initialTimer.current);
    }

    // 500毫秒后显示第一个tooltip
    initialTimer.current = setTimeout(() => {
      if (chartInstance.current) {
        chartInstance.current.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: 0,
        });
      }
    }, 500);

    // 设置定时器自动切换Tooltip
    tooltipInterval.current = setInterval(() => {
      showNextTooltip();
    }, 3000);
  };

  const onChange = async (value: TimeRangeThreeEnum) => {
    const res = await preLeftThreeDatas(value);

    // 更新option
    const newOption = {
      ...option,
      xAxis: {
        ...option.xAxis,
        data: res.xDatas,
        axisLabel: {
          ...option.xAxis.axisLabel,
          interval: (index: number) =>
            index % Math.ceil(res.xDatas.length / 8) === 0,
        },
      },
      color: res.yDatas.map((item: any) => item.color),
      series: res.yDatas.map((item: any) => {
        return {
          name: item.name,
          data: item.datas,
          type: "line",
          smooth: true,
          symbol:
            "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAQ5JREFUOE+1la1OQ0EQRs8kCFIQdVCCxIBpCK1AInkDHC+B4QkwvASub4GsaE0NGCRpKhGFVDQZ+Mjem9vNbkphmWTMfjNnd3b2x0iYuxuwH7wNbIewBfAGzORm5nG6ElfM3QU6AXZSkzXG3oEnMxO8thWgux8DR2tAsfxiZs/VYA38Jazi1NBvYCizv+HK4vCRyrfQgIsf7Nm6+bSnjwIeAGeZaGnXQDfoE+ABmGbixwKeAoeJAMHuv3w30ubATQb6KqDKjZPEuAXOMysZAncJbS7gJbCVEAdAKwP8AK4S2vJfgMVLLt6UDtAreWx0W8od7OJXryq16OPwR2j6+WpAyz2wDagape7vARt9AZ+G3HmhiKS3xwAAAABJRU5ErkJggg==",
          symbolSize: 10,
          showSymbol: false,
          label: {
            show: true,
            position: "top",
            distance: 10,
            color: "#ffffff",
            fontSize: 8,
          },
          lineStyle: {
            shadowColor: "rgb(0, 0, 0, 0.4)",
            shadowBlur: 3,
            shadowOffsetY: 10,
            width: 3,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: `${item.color}88`,
              },
              {
                offset: 1,
                color: item.color,
              },
            ]),
          },
        };
      }),
    };

    setOption(newOption);
    chartInstance.current?.setOption(newOption, true);

    // 重置tooltip循环
    currentTooltipIndex.current = 0;
    startTooltipLoop();
  };

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
      chartInstance.current.setOption(option);

      // 启动tooltip循环
      startTooltipLoop();
    }

    return () => {
      // 清除定时器
      if (tooltipInterval.current) {
        clearInterval(tooltipInterval.current);
      }
      if (initialTimer.current) {
        clearTimeout(initialTimer.current);
      }
      // 销毁图表实例
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <FadeSelectBox defaultValue={defaultValue} onChange={onChange} />
      <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
}
