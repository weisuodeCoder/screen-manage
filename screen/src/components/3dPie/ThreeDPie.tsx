import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import "echarts-gl";
import { getPie3D, getParametricEquation } from "./hook";
import "./style.less"; // Assuming your styles are in this file

interface Props {}

const RightWrapper: React.FC<Props> = () => {
  const pie3DRef = useRef<HTMLDivElement | null>(null);
  const [pie3DChart, setPie3DChart] = useState<echarts.ECharts | null>(null);
  const [pipeYData, setPipeYData] = useState<number[]>([]);
  const [option, setOption] = useState<any>({});
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

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
      drawPie3D(pie3DChart);
    }
  }, [pie3DChart]);

  const drawPie3D = (pie3DChart: echarts.ECharts) => {
    let colors = ["#FAD05C", "#0885FA", "#FA7F7F"];
    let xData = ["进行中", "已用完", "已报损"];
    let originalData = [70000, 20000, 10000];
    let sum = originalData.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const pipeData = originalData.map((value) => (value / sum) * 100);
    setPipeYData(pipeData);

    const option = getPie3D(xData, originalData, colors, 0.8);
    pie3DChart.setOption(option);

    let hoveredIndex = "";
    let selectedIndex = "";
    pie3DChart.on("click", (params: any) => {
      selectedIndex = params.seriesIndex;
      option.series.forEach((item: any, index: number) => {
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
      pie3DChart.setOption(option);
    });
    loopSelect(pie3DChart, option, pipeData);
  };

  const loopSelect = (
    pie3DChart: echarts.ECharts,
    option: any,
    pipeData: number[]
  ) => {
    let index = 0;
    const id = setInterval(() => {
      if (pie3DChart) {
        option.series.forEach((item: any, i: number) => {
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
        pie3DChart.setOption(option);
        pie3DChart.dispatchAction({
          type: "showTip",
          name: "进行中",
        });

        index = index === 2 ? 0 : index + 1;
      }
    }, 3000);

    setIntervalId(id);
  };

  return (
    <div className="threeD_pie_main">
      <div className="threeD_pie_bg"></div>
      <div
        ref={pie3DRef}
        style={{ width: "100%", height: "100%" }}
        className="threeD_pie_chart"
      ></div>
    </div>
  );
};

export default RightWrapper;
