import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import * as echarts from "echarts";
import "echarts-gl";
import { getPie3D, getParametricEquation } from "./hook";
import "./style.less";
import { IntervalWorkRef } from "@/views/type";

interface Props {
  datas: any[];
}

const RightWrapper = forwardRef<IntervalWorkRef, Props>(({ datas }, ref) => {
  const pie3DRef = useRef<HTMLDivElement | null>(null);
  const pie3DChart = useRef<echarts.ECharts | null>(null);
  const currentIndexRef = useRef(0);
  const [customTooltip, setCustomTooltip] = useState<{
    show: boolean;
    name?: string;
    value?: number;
    percent?: number;
    opacity: number;
  }>({ show: false, opacity: 0 });
  const currentOption = useRef<Record<string, any> | null>(null);
  const pipeData = useRef<Record<string, any> | null>(null);
  const isMouseEnter = useRef(false);
  const lastName = useRef("");

  const drawPie3D = () => {
    if (!pie3DChart.current) return;

    const colors = datas?.map((item) => item.colorOne);
    const xData = datas?.map((item) => item.name);

    // 确保所有值为数字
    const originalData = datas?.map((item) => Number(item.value) || 0);

    // 添加验证
    if (originalData.some(isNaN)) {
      console.error("存在非数字值", datas);
      return;
    }

    const sum = originalData.reduce((a, b) => a + b, 0);

    // 处理sum为0的情况
    pipeData.current =
      sum > 0
        ? originalData.map((value) => (value / sum) * 100)
        : originalData.map(() => 0);

    currentOption.current = getPie3D(xData, originalData, colors, 0.8);
    pie3DChart.current.setOption(currentOption.current);
  };

  const showTooltip = (index: number) => {
    setCustomTooltip({
      show: true,
      name: datas[index]?.name,
      value: datas[index]?.value,
      percent: pipeData.current?.[index],
      opacity: 1,
    });

    // 3秒后淡出
    setTimeout(() => {
      setCustomTooltip((prev) => ({ ...prev, opacity: 0 }));
      setTimeout(() => {
        setCustomTooltip((prev) => ({ ...prev, show: false }));
      }, 300);
    }, 2600);
  };

  const updateChartSelection = (index: number) => {
    if (!pie3DChart.current || !currentOption.current?.series) return;

    currentOption.current.series.forEach((item: any, i: number) => {
      if (item.pieData) {
        item.pieStatus.selected = i === index;
        item.parametricEquation = getParametricEquation(
          item.pieData.startRatio,
          item.pieData.endRatio,
          item.pieStatus.selected,
          false,
          1,
          pipeData.current?.[index]
        );
      }
    });

    pie3DChart.current.setOption(currentOption.current);
    showTooltip(index);
  };

  const intervalWork = () => {
    if (isMouseEnter.current) return;
    // 立即显示第一个tooltip
    updateChartSelection(currentIndexRef.current);
    currentIndexRef.current = (currentIndexRef.current + 1) % datas.length;
  };

  const onMouseEnter = () => {
    isMouseEnter.current = true;
  };

  const onMouseLeave = () => {
    isMouseEnter.current = false;
    intervalWork();
  };

  // 鼠标移入扇形时触发
  const handleMouseOver = (params: any) => {
    if (
      params.seriesType === "surface" &&
      params.seriesName !== lastName.current
    ) {
      updateChartSelection(params.seriesIndex);
      lastName.current = params.seriesName;
    }
  };

  // 初始化图表
  useEffect(() => {
    if (pie3DRef.current) {
      pie3DChart.current = echarts.init(pie3DRef.current);
      drawPie3D();

      return () => {
        pie3DChart.current?.dispose();
      };
    }
  }, []);

  // 数据变化时重新绘制
  useEffect(() => {
    if (pie3DChart.current) {
      drawPie3D();
    }
  }, [datas]);

  // 鼠标事件处理
  useEffect(() => {
    const chart = pie3DChart.current;
    if (!chart) return;

    chart.on("mouseover", handleMouseOver);

    return () => {
      chart.off("mouseover", handleMouseOver);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    intervalWork,
  }));

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="threeD_pie_main"
      style={{ position: "relative" }}
    >
      <div className="threeD_pie_bg"></div>
      <div
        ref={pie3DRef}
        style={{ width: "100%", height: "100%" }}
        className="threeD_pie_chart"
      ></div>
      {customTooltip.show && !isMouseEnter.current && (
        <div
          className="custom-tooltip"
          style={{
            position: "absolute",
            left: "5%",
            top: "10%",
            transform: "translate(-50%, 0)",
            background: "#fffc",
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
});

export default RightWrapper;
