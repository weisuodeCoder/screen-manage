import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import "echarts-gl";
import { getPie3D, getParametricEquation } from "./hook";
import "./style.less"; // Assuming your styles are in this file

interface Props {
  datas: any[];
}

const RightWrapper: React.FC<Props> = ({ datas }: Props) => {
  const pie3DRef = useRef<HTMLDivElement | null>(null);
  const [pie3DChart, setPie3DChart] = useState<echarts.ECharts | null>(null);
  const [pipeYData, setPipeYData] = useState<number[]>([]);
  const [option, setOption] = useState<any>({});
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [customTooltip, setCustomTooltip] = useState<{
    show: boolean;
    name?: string;
    value?: number;
    percent?: number;
    opacity: number;
  }>({ show: false, opacity: 0 });

  useEffect(() => {
    if (pie3DRef.current) {
      const chart = echarts.init(pie3DRef.current);
      setPie3DChart(chart);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  useEffect(() => {
    if (pie3DChart) {
      // 清除之前的定时器
      if (intervalId) {
        clearInterval(intervalId);
      }

      drawPie3D(pie3DChart);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [pie3DChart, datas]); // 添加datas作为依赖项

  useEffect(() => {
    if (pie3DChart) {
      pie3DChart.on("mouseover", () => {
        setCustomTooltip((prev) => ({ ...prev, show: false, opacity: 0 }));
      });

      pie3DChart.on("mouseout", () => {
        setCustomTooltip((prev) => ({ ...prev, show: true, opacity: 1 }));
      });

      return () => {
        pie3DChart.off("mouseover");
        pie3DChart.off("mouseout");
      };
    }
  }, [pie3DChart]);

  const drawPie3D = (pie3DChart: echarts.ECharts) => {
    const colors = datas?.map((item) => item.colorOne);
    const xData = datas?.map((item) => item.name);
    const originalData = datas?.map((item) => item.value);

    const sum = originalData.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const pipeData = originalData.map((value) => (value / sum) * 100);
    setPipeYData(pipeData);

    const currentOption = getPie3D(xData, originalData, colors, 0.8);
    pie3DChart.setOption(currentOption);

    let selectedIndex = 0;
    pie3DChart.on("click", (params: { seriesIndex: number }) => {
      selectedIndex = params.seriesIndex;
      currentOption.series.forEach((item: any, index: number) => {
        if (item.pieData) {
          item.pieStatus.selected = selectedIndex === index;
          item.parametricEquation = getParametricEquation(
            item.pieData.startRatio,
            item.pieData.endRatio,
            item.pieStatus.selected,
            false,
            1,
            pipeData[selectedIndex]
          );
        }
      });
      pie3DChart.setOption(currentOption);
    });

    // 开始轮播
    startLoop(pie3DChart, currentOption, pipeData);
  };

  const startLoop = (
    pie3DChart: echarts.ECharts,
    currentOption: any,
    pipeData: number[]
  ) => {
    let index = 0;
    let tooltipTimer: NodeJS.Timeout | null = null;

    const showTooltip = (idx: number) => {
      // 清除之前的定时器
      if (tooltipTimer) {
        clearTimeout(tooltipTimer);
      }

      // 立即显示tooltip
      setCustomTooltip({
        show: true,
        name: datas[idx]?.name,
        value: datas[idx]?.value,
        percent: pipeData[idx],
        opacity: 1,
      });

      // 3秒后隐藏tooltip
      tooltipTimer = setTimeout(() => {
        setCustomTooltip((prev) => ({ ...prev, opacity: 0 }));

        // 淡出动画完成后隐藏
        setTimeout(() => {
          setCustomTooltip((prev) => ({ ...prev, show: false }));
        }, 300);
      }, 2600);
    };

    // 初始显示第一个tooltip（500毫秒后）
    const initialTimer = setTimeout(() => {
      if (pie3DChart) {
        currentOption.series.forEach((item: any, i: number) => {
          if (item.pieData) {
            item.pieStatus.selected = i === index;
            item.parametricEquation = getParametricEquation(
              item.pieData.startRatio,
              item.pieData.endRatio,
              item.pieStatus.selected,
              false,
              1,
              pipeData[index]
            );
          }
        });
        pie3DChart.setOption(currentOption);
        showTooltip(index);
        index = index === datas.length - 1 ? 0 : index + 1;
      }
    }, 500);

    // 设置循环（每3秒切换一次）
    const id = setInterval(() => {
      if (pie3DChart) {
        currentOption.series.forEach((item: any, i: number) => {
          if (item.pieData) {
            item.pieStatus.selected = i === index;
            item.parametricEquation = getParametricEquation(
              item.pieData.startRatio,
              item.pieData.endRatio,
              item.pieStatus.selected,
              false,
              1,
              pipeData[index]
            );
          }
        });
        pie3DChart.setOption(currentOption);
        showTooltip(index);
        index = index === datas.length - 1 ? 0 : index + 1;
      }
    }, 3000);

    setIntervalId(id);

    return () => {
      clearTimeout(initialTimer);
      if (tooltipTimer) {
        clearTimeout(tooltipTimer);
      }
    };
  };

  return (
    <div className="threeD_pie_main" style={{ position: "relative" }}>
      <div className="threeD_pie_bg"></div>
      <div
        ref={pie3DRef}
        style={{ width: "100%", height: "100%" }}
        className="threeD_pie_chart"
      ></div>
      {customTooltip.show && (
        <div
          className="custom-tooltip"
          style={{
            position: "absolute",
            left: "5%",
            top: "10%",
            transform: "translate(-50%, 0)",
            background: "rgba(255,255,255,0.95)",
            border: "1px solid #eee",
            borderRadius: 8,
            padding: "12px 20px",
            color: "#333",
            minWidth: 120,
            zIndex: 10,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            opacity: customTooltip.opacity,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 6 }}>
            {customTooltip.name}
          </div>
          <div>数量：{customTooltip.value}</div>
          <div>占比：{customTooltip.percent?.toFixed(2)}%</div>
        </div>
      )}
    </div>
  );
};

export default RightWrapper;
