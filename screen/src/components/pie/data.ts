interface ItemStyleImpl {
  colors: [string, string];
  color?: echarts.graphic.LinearGradient;
}

interface PieDatasImpl {
  value: number;
  name: string;
  itemStyle: ItemStyleImpl;
}
export const datas = [
  {
    title: "title1",
    unit: "人",
    datas: [
      {
        value: 25,
        name: "体育",
        unit: "人",
        itemStyle: {
          //颜色渐变
          colors: ["rgba(11, 77, 44, 1)", "rgba(77, 255, 181, 1)"],
        },
      },
      {
        value: 40,
        name: "美术",
        unit: "人",
        itemStyle: {
          //颜色渐变
          colors: ["rgba(3,65,128,1)", "rgba(115,208,255,1)"],
        },
      },
      {
        value: 20,
        name: "数学",
        unit: "人",
        itemStyle: {
          //颜色渐变
          colors: ["rgba(255, 0, 0, 1)", "rgba(255, 100, 100, 1)"],
        },
      },
      {
        value: 15,
        name: "语文",
        unit: "人",
        itemStyle: {
          //颜色渐变
          colors: ["rgba(153, 105, 38, 1)", "rgba(255, 200, 89, 1)"],
        },
      },
    ],
  },
  {
    title: "title2",
    unit: "人",
    datas: [
      {
        value: 25,
        name: "体育",
        unit: "人",
        itemStyle: {
          //颜色渐变
          colors: ["rgba(11, 77, 44, 1)", "rgba(77, 255, 181, 1)"],
        },
      },
      {
        value: 40,
        name: "美术",
        unit: "人",
        itemStyle: {
          //颜色渐变
          colors: ["rgba(3,65,128,1)", "rgba(115,208,255,1)"],
        },
      },
      {
        value: 20,
        name: "数学",
        unit: "人",
        itemStyle: {
          //颜色渐变
          colors: ["rgba(255, 0, 0, 1)", "rgba(255, 100, 100, 1)"],
        },
      },
      {
        value: 15,
        name: "语文",
        unit: "人",
        itemStyle: {
          //颜色渐变
          colors: ["rgba(153, 105, 38, 1)", "rgba(255, 200, 89, 1)"],
        },
      },
    ],
  },
];
export const pieDatas: PieDatasImpl[] = [
  {
    value: 25,
    name: "体育",
    unit: "人",
    itemStyle: {
      //颜色渐变
      colors: ["rgba(11, 77, 44, 1)", "rgba(77, 255, 181, 1)"],
    },
  },
  {
    value: 40,
    name: "美术",
    unit: "人",
    itemStyle: {
      //颜色渐变
      colors: ["rgba(3,65,128,1)", "rgba(115,208,255,1)"],
    },
  },
  {
    value: 20,
    name: "数学",
    unit: "人",
    itemStyle: {
      //颜色渐变
      colors: ["rgba(255, 0, 0, 1)", "rgba(255, 100, 100, 1)"],
    },
  },
  {
    value: 15,
    name: "语文",
    unit: "人",
    itemStyle: {
      //颜色渐变
      colors: ["rgba(153, 105, 38, 1)", "rgba(255, 200, 89, 1)"],
    },
  },
];
