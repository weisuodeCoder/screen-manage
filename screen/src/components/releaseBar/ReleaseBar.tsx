import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import * as echarts from "echarts";
import { TimeRangeEnum } from "@/views/home/index.api";
import ReleaseSelectBox from "./ReleaseSelectBox";
import { IntervalWorkRef } from "@/views/type";

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

const ReleaseBar = forwardRef<IntervalWorkRef, PropsImpl>(
  ({ datas, defaultSelected, preLeftTwoDatas }, ref) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.ECharts | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const isMouseEnter = useRef(false);

    // 计算每个数据点的比例
    const calculatePercentages = (dataIndex: number) => {
      if (!datas.yDatas || datas.yDatas.length < 2) return [];

      return datas.yDatas.map((series) => {
        const total = series.datas.reduce(
          (total, num) => Number(total) + Number(num),
          0
        );
        const value = parseFloat(series.datas[dataIndex]) || 0;
        return total > 0 ? ((value / total) * 100).toFixed(1) + "%" : "0%";
      });
    };

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
        backgroundColor: "#fffc",
        borderWidth: 1,
        borderColor: "#333",
        textStyle: {
          color: "#333",
        },
        extraCssText: "z-index: 1;",
        formatter: (params: any) => {
          const percentages = calculatePercentages(params[0].dataIndex);
          let tooltipHtml = `<div style="font-weight:bold;margin-bottom:0.1vh;font-size: 1.5vh">${params[0].name}</div>`;

          params.forEach((param: any, index: number) => {
            tooltipHtml += `
              <div style="display:flex;align-items:center;margin:0.3vh 0;font-size: 1.5vh">
                
                <span style="flex:1">${param.seriesName}:</span>
                <span style="margin-left:0.5vh;">${param.value}人</span>
                ${
                  percentages[index]
                    ? `<span style="margin-left:0.5vh;color:#666">(${percentages[index]})</span>`
                    : ""
                }
              </div>
            `;
          });

          return tooltipHtml;
        },
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
      if (chartInstance.current && datas.xDatas.length > 0) {
        chartInstance.current.dispatchAction({
          type: "showTip",
          seriesIndex: 0, // 显示第一个系列的tooltip
          dataIndex: dataIndex,
        });
      }
    };

    const intervalWork = () => {
      if (isMouseEnter.current) return;
      if (datas.xDatas.length === 0) return;
      showTooltip(currentIndex);
      const nextIndex = (currentIndex + 1) % datas.xDatas.length;
      setCurrentIndex(nextIndex);
    };

    const onChange = async (value: "1" | "2" | "3") => {
      const res = await preLeftTwoDatas(value);
      setCurrentIndex(0);

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
      chartInstance.current?.setOption(newOption, true);
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

        // 鼠标交互处理
        chartInstance.current.getZr().on("mouseover", () => {
          isMouseEnter.current = true;
        });

        chartInstance.current.getZr().on("mouseout", () => {
          isMouseEnter.current = false;
        });
      }

      return () => {
        chartInstance.current?.dispose();
      };
    }, []);

    useImperativeHandle(ref, () => ({
      intervalWork,
    }));

    return (
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <ReleaseSelectBox defaultValue={defaultSelected} onChange={onChange} />
        <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
      </div>
    );
  }
);

export default ReleaseBar;
