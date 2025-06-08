import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import pieMidCircle from "../../assets/pie/pie-mid-circle.png";
import { usePieHooks } from "./hook";

interface PropsImpl {
  datas: any[];
}

export default function Pie({ datas }: PropsImpl) {
  const { setChartColor } = usePieHooks();
  const chartRef1 = useRef<HTMLDivElement>(null);
  const chartRef2 = useRef<HTMLDivElement>(null);

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
  const baseOption = {
    backgroundColor: "transparent",
    title: {
      text: datas[0].title,
      left: "center",
      top: 10,
      textStyle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c}人 ({d}%)",
    },
    legend: {
      show: false,
      type: "scroll",
      orient: "horizontal",
      bottom: 3,
      textStyle: {
        color: "#fff",
      },
      data: pieData1.map((item) => item.name),
    },
    graphic: [
      {
        type: "image",
        id: "center-img",
        top: "center",
        left: "center",
        z: 10,
        style: {
          image: pieMidCircle,
          width: 75,
          height: 75,
        },
      },
      {
        type: "text",
        left: "center",
        top: "center",
        z: 11,
        style: {
          text: `总数\n\n${total1}${datas[0].unit}`,
          x: 0,
          y: 0,
          textAlign: "center",
          textVerticalAlign: "middle",
          font: "bold 0.65em Microsoft YaHei",
          fill: "#fff",
        },
      },
    ],
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
        center: ["50%", "50%"],
        radius: ["27%", "42%"],
        avoidLabelOverlap: true,
        data: pieData1,
      },
    ],
  };

  const option1 = {
    ...baseOption,
    title: {
      ...baseOption.title,
      text: datas[0].title,
    },
  };

  const option2 = {
    ...baseOption,
    title: {
      ...baseOption.title,
      text: datas[1].title,
    },
    graphic: [
      ...baseOption.graphic.slice(0, -1),
      {
        ...baseOption.graphic[1],
        style: {
          ...baseOption.graphic[1].style,
          text: `总数\n\n${total2}${datas[1].unit}`,
        },
      },
    ],
    series: [
      {
        ...baseOption.series[0],
        name: datas[1].title,
        data: pieData2,
      },
    ],
  };

  useEffect(() => {
    const resizeCharts = () => {
      if (chartRef1.current) {
        const chart1 =
          echarts.getInstanceByDom(chartRef1.current) ||
          echarts.init(chartRef1.current);
        chart1.resize();
      }
      if (chartRef2.current) {
        const chart2 =
          echarts.getInstanceByDom(chartRef2.current) ||
          echarts.init(chartRef2.current);
        chart2.resize();
      }
    };

    if (chartRef1.current) {
      const chart1 = echarts.init(chartRef1.current);
      chart1.setOption(option1);
    }
    if (chartRef2.current) {
      const chart2 = echarts.init(chartRef2.current);
      chart2.setOption(option2);
    }

    window.addEventListener("resize", resizeCharts);

    return () => {
      window.removeEventListener("resize", resizeCharts);
      if (chartRef1.current) {
        echarts.getInstanceByDom(chartRef1.current)?.dispose();
      }
      if (chartRef2.current) {
        echarts.getInstanceByDom(chartRef2.current)?.dispose();
      }
    };
  }, [option1, option2]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div ref={chartRef1} style={{ flex: 1, height: "100%" }}></div>
      <div ref={chartRef2} style={{ flex: 1, height: "100%" }}></div>
    </div>
  );
}
