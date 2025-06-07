import * as echarts from "echarts";

export function usePieHooks() {
  const setChartColor = (
    color1: string,
    color2: string
  ): echarts.graphic.LinearGradient => {
    return new echarts.graphic.LinearGradient(0, 0, 1, 1, [
      { offset: 0, color: color1 },
      { offset: 1, color: color2 },
    ]);
  };
  return { setChartColor };
}
