import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import pieMidCircle from "../../assets/pie/pie-mid-circle.png";

export default function Pie() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState([
    {
      value: 25,
      name: "体育",
      itemStyle: {
        //颜色渐变
        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          { offset: 0, color: "rgba(11, 77, 44, 1)" },
          { offset: 1, color: "rgba(77, 255, 181, 1)" },
        ]),
      },
    },
    {
      value: 40,
      name: "美术",
      itemStyle: {
        //颜色渐变
        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          { offset: 0, color: "rgba(3,65,128,1)" },
          { offset: 1, color: "rgba(115,208,255,1)" },
        ]),
      },
    },
    {
      value: 20,
      name: "数学",
      itemStyle: {
        //颜色渐变
        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          { offset: 0, color: "rgba(255, 0, 0, 1)" },
          { offset: 1, color: "rgba(255, 100, 100, 1)" },
        ]),
      },
    },
    {
      value: 15,
      name: "语文",
      itemStyle: {
        //颜色渐变
        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          { offset: 0, color: "rgba(153, 105, 38, 1)" },
          { offset: 1, color: "rgba(255, 200, 89, 1)" },
        ]),
      },
    },
  ]);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const [option, setOption] = useState({
    backgroundColor: "transparent",
    grid: {
      left: "5%",
      right: "15%",
      top: "10%",
      bottom: "10%",
      containLabel: true,
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      right: 10,
      top: "20%",
      bottom: 20,
      textStyle: {
        color: "#fff",
      },
    },
    graphic: [
      {
        type: "image",
        id: "center-img",
        left: "center",
        top: "center",
        z: 10,
        style: {
          image: pieMidCircle,
          width: 140,
          height: 140,
        },
      },
      {
        type: "text",
        left: "center",
        top: "center",
        z: 11,
        style: {
          text: `总数：${total}`,
          x: 0,
          y: 0,
          textAlign: "center",
          textVerticalAlign: "middle",
          font: "bold 16px Microsoft YaHei",
          fill: "#fff",
        },
      },
    ],
    series: [
      {
        type: "pie",
        itemStyle: {
          borderWidth: 5,
          borderColor: "rgba(26, 57, 77,1)",
        },
        label: {
          show: true,
          position: "outside",
          formatter: "{d}",
          color: "#fff",
        },
        radius: ["55%", "70%"],
        color: [
          "#c487ee",
          "#deb140",
          "#49dff0",
          "#034079",
          "#6f81da",
          "#00ffb4",
        ],
        data,
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
