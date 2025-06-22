export const createGeo = (mapKey: string) => [
  {
    map: mapKey,
    zoom: 1,
    roam: false,
    layoutCenter: ["50%", "51.5%"],
    layoutSize: "100%",
    itemStyle: {
      normal: {
        areaColor: "#000000",
        borderWidth: 1,
        borderColor: "#2ab8ff",
        shadowColor: "#2ab8ff",
        shadowBlur: 20,
        shadowOffsetX: 14,
        shadowOffsetY: 15,
      },
    },
  },
  {
    map: mapKey,
    zoom: 1,
    roam: false,
    layoutCenter: ["50%", "53%"],
    layoutSize: "100%",
    itemStyle: {
      normal: {
        areaColor: "#00000055",
        borderWidth: 1,
        borderColor: "#2ab8ff",
        shadowBlur: 10,
        shadowColor: "#2ab8ff",
        shadowOffsetX: 12,
        shadowOffsetY: 11,
      },
    },
  },
];
