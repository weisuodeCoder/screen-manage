import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as echarts from "echarts";
import pieMidCircle from "../../assets/pie/pie-mid-circle.png";
import { usePieHooks } from "./hook";
import { IntervalWorkRef } from "@/views/type";
import "./style.less";

interface PropsImpl {
  datas: any[];
}

const Pie = forwardRef<IntervalWorkRef, PropsImpl>(({ datas }, ref) => {
  const { setChartColor } = usePieHooks();
  const chartRef = useRef<HTMLDivElement>(null);
  const tooltipInterval = useRef<NodeJS.Timeout>(null);
  const currentSeriesIndex = useRef(0); // 0表示饼图1，1表示饼图2
  const currentTooltipIndex = useRef(0); // 第一个饼图的tooltip索引
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const isMouseEnter = useRef(false);

  // 检查数据是否有效
  const isValidData =
    datas?.length >= 2 &&
    datas[0]?.datas?.length > 0 &&
    datas[1]?.datas?.length > 0;

  if (!isValidData) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          color: "#fff",
          fontSize: "14px",
        }}
      >
        数据不足，无法显示图表
      </div>
    );
  }

  // 准备图表数据
  const pieData1 = [...datas[0].datas];
  const pieData2 = [...datas[1].datas];

  pieData1.forEach((item) => {
    const [color1, color2] = item.itemStyle.colors;
    item.itemStyle.color = setChartColor(color1, color2);
  });

  pieData2.forEach((item) => {
    const [color1, color2] = item.itemStyle.colors;
    item.itemStyle.color = setChartColor(color1, color2);
  });

  const total1 = pieData1.reduce((sum, item) => sum + item.value, 0);
  const total2 = pieData2.reduce((sum, item) => sum + item.value, 0);

  // 基础配置选项
  const option = {
    backgroundColor: "transparent",
    title: [
      {
        text: datas[0].title,
        left: "25%",
        top: 10,
        textStyle: {
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
        },
      },
      {
        text: datas[1].title,
        left: "75%",
        top: 10,
        textStyle: {
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
        },
      },
    ],
    tooltip: {
      backgroundColor: "#fffc",
      trigger: "item",
      multiple: true,
      alwaysShowContent: true,
      formatter: (params: any) => {
        return `<span style='font-weight: blod;'>${params.seriesName}</span> <br/>${params.name}: ${params.value}人 (${params.percent}%)`;
      },
    },
    legend: {
      show: false,
    },
    series: [
      {
        name: datas[0].title,
        type: "pie",
        itemStyle: {
          borderWidth: 5,
          borderColor: "rgba(26, 57, 77,1)",
        },
        label: {
          show: true,
          formatter: (params: any) => {
            return `{name|${params.name}}\n{value|${params.value}${
              params.data.unit || ""
            }}`;
          },
          rich: {
            name: {
              fontSize: 12,
              color: "#fff",
              padding: [0, 0, 2, 0],
            },
            value: {
              fontSize: 10,
              fontWeight: "bold",
              color: "#ffd700",
              padding: [2, 0, 0, 0],
            },
          },
        },
        labelLine: {
          show: true,
          length: 10,
          length2: 5,
          smooth: 0.2,
          lineStyle: {
            width: 1,
            color: "rgba(255, 255, 255, 0.7)",
          },
        },
        center: ["30%", "50%"],
        radius: ["27%", "42%"],
        avoidLabelOverlap: true,
        data: pieData1,
      },
      {
        name: datas[1].title,
        type: "pie",
        itemStyle: {
          borderWidth: 5,
          borderColor: "rgba(26, 57, 77,1)",
        },
        label: {
          show: true,
          formatter: (params: any) => {
            return `{name|${params.name}}\n{value|${params.value}${
              params.data.unit || ""
            }}`;
          },
          rich: {
            name: {
              fontSize: 12,
              color: "#fff",
              padding: [0, 0, 2, 0],
            },
            value: {
              fontSize: 10,
              fontWeight: "bold",
              color: "#ffd700",
              padding: [2, 0, 0, 0],
            },
          },
        },
        labelLine: {
          show: true,
          length: 10,
          length2: 5,
          smooth: 0.2,
          lineStyle: {
            width: 1,
            color: "rgba(255, 255, 255, 0.7)",
          },
        },
        center: ["70%", "50%"],
        radius: ["27%", "42%"],
        avoidLabelOverlap: true,
        data: pieData2,
      },
    ],
  };

  const intervalWork = () => {
    if (isMouseEnter.current || !chartInstance.current) return;

    // 获取当前饼图的数据长度
    const currentDataLength =
      currentSeriesIndex.current === 0 ? pieData1.length : pieData2.length;

    // 显示当前饼图的tooltip
    chartInstance.current.dispatchAction({
      type: "showTip",
      seriesIndex: currentSeriesIndex.current,
      dataIndex: currentTooltipIndex.current,
    });

    // 更新索引
    currentTooltipIndex.current =
      (currentTooltipIndex.current + 1) % currentDataLength;

    // 如果完成了一圈，切换到另一个饼图
    if (currentTooltipIndex.current === 0) {
      currentSeriesIndex.current = currentSeriesIndex.current === 0 ? 1 : 0;
    }
  };

  const onMouseEnter = () => {
    isMouseEnter.current = true;
  };
  const onMouseLeave = () => {
    isMouseEnter.current = false;
    intervalWork();
  };

  useEffect(() => {
    const resizeChart = () => {
      if (chartRef.current) {
        const chart =
          echarts.getInstanceByDom(chartRef.current) ||
          echarts.init(chartRef.current);
        chart.resize();
      }
    };

    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
      chartInstance.current.setOption(option);
    }

    window.addEventListener("resize", resizeChart);

    return () => {
      window.removeEventListener("resize", resizeChart);
      if (chartInstance.current) chartInstance.current.dispose();
      if (tooltipInterval.current) clearInterval(tooltipInterval.current);
    };
  }, [option, pieData1.length, pieData2.length]);

  useImperativeHandle(ref, () => ({
    intervalWork,
  }));

  return (
    <div className="pieChartBox">
      <div className="left_box">
        <div className="center">
          <div className="total_1">总数</div>
          <div className="total_2">
            {total1 || 0}
            {datas?.[0]?.unit || ""}
          </div>
        </div>
      </div>
      <div className="right_box">
        <div className="center">
          <div className="total_1">总数</div>
          <div className="total_2">
            {total2 || 0}
            {datas?.[1]?.unit || ""}
          </div>
        </div>
      </div>
      <div
        ref={chartRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="chart_container"
      />
    </div>
  );
});

export default Pie;
