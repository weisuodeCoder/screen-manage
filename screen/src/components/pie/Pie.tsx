import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import pieMidCircle from "../../assets/pie/pie-mid-circle.png";
import { pieDatas } from "./data";
import { usePieHooks } from "./hook";

export default function Pie() {
  const { setChartColor } = usePieHooks();
  const chartRef = useRef<HTMLDivElement>(null);
  pieDatas.forEach((item) => {
    const [color1, color2] = item.itemStyle.colors;
    item.itemStyle.color = setChartColor(color1, color2);
  });
  const [data, setData] = useState(pieDatas);
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
