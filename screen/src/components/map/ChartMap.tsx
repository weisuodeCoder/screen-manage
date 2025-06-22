import React, {
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useState,
  useImperativeHandle,
} from "react";
import * as echarts from "echarts";
import * as turf from "@turf/turf";
import "./ChartMap.less";
import { createGeo } from "./hook";
import Modal from "../modal/Modal";
import ADCodeList from "./ADCodeList";
import { IntervalWorkRef } from "@/views/type";

interface MapDatasImpl {
  name: string;
  adcode: number;
  value: number;
  id: string;
  title: string;
}

interface Props {
  elementId?: string;
  datas?: MapDatasImpl[];
  colors?: string[];
  onChange?: (key: "working" | "need") => void;
}

const defaultColors = [
  "#eeff41",
  "#76ff03",
  "#6200ea",
  "#aa00ff",
  "#ad1457",
  "#c62828",
];

const ChartMap = forwardRef<IntervalWorkRef, Props>(
  ({ elementId, datas = [], colors = defaultColors }, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groupId, setGroupId] = useState("");
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<any>(null);
    const currentMap = useRef<"china" | number>("china"); // 用来追踪当前地图
    const currentTooltipIndex = useRef(0);
    const [title, setTitle] = useState("");

    const id = useRef(elementId || String(Math.floor(Math.random() * 1e6)));

    const loadMap = useCallback(async (adcode: string | number = "china") => {
      const path = `/resources/${adcode}.geojson`;
      const res = await fetch(path).then((r) => r.json());
      return res;
    }, []);

    const showNextTooltip = useCallback(() => {
      if (!chartInstance.current) return;

      const instance = chartInstance.current;
      const option = instance.getOption();

      // 获取当前地图的所有数据点
      const scatterData = option?.series?.[1]?.data;
      if (!scatterData || scatterData.length === 0) return;

      // 循环显示 tooltip
      currentTooltipIndex.current =
        (currentTooltipIndex.current + 1) % scatterData.length;

      const dataIndex = currentTooltipIndex.current;
      const dataItem = scatterData[dataIndex];

      // 显示 tooltip
      instance.dispatchAction({
        type: "showTip",
        seriesIndex: 1,
        dataIndex: dataIndex,
      });
    }, []);

    const setOptions = useCallback(
      async (adcode: "china" | number = "china") => {
        const mapJson = await loadMap(adcode);
        const mapKey = adcode.toString();
        echarts.registerMap(mapKey, mapJson);

        if (!chartRef.current) return;
        if (!chartInstance.current) {
          chartInstance.current = echarts.init(chartRef.current, "dark");
        }

        const data = mapJson.features.map((item: any) => {
          const centerFeature = turf.center(item);
          return {
            name: item.properties.name,
            value: item.properties.adcode,
            center: centerFeature.geometry.coordinates,
          };
        });

        const getEffectScatterData = (
          mapLevel: string | number,
          allPoints: any[],
          data: { name: string; value: string; center: [number, number] }[]
        ): { name: string; value: number[]; adcode: string }[] => {
          if (mapLevel === "china") {
            // 聚合为省
            const groups: { [key: string]: any[] } = {};

            allPoints.forEach((point) => {
              const provinceCode = String(point.adcode).slice(0, 2) + "0000";
              if (!groups[provinceCode]) groups[provinceCode] = [];
              groups[provinceCode].push(point);
            });

            const aggregated = Object.entries(groups).map(
              ([provinceAdcode, points]) => {
                let lnglat = [0, 0];
                let name = "";

                data.forEach((item) => {
                  if (`${provinceAdcode}` === `${item.value}`) {
                    lnglat = item.center;
                    name = item.name;
                  }
                });
                const count = points.reduce((sum, p) => sum + p.value, 0);

                return {
                  name, // 可自定义
                  value: [...lnglat, count],
                  adcode: provinceAdcode,
                };
              }
            );

            return aggregated;
          } else {
            const prefix = String(mapLevel).slice(0, 2);
            const filterData = allPoints.filter((p) =>
              String(p.adcode).startsWith(prefix)
            );
            return filterData.map((item) => {
              let lnglat = [0, 0];
              data.forEach((d) => {
                if (`${d.value}` === `${item.adcode}`) lnglat = d.center;
              });
              return {
                name: item.title,
                value: [...lnglat, item.value],
                adcode: item.adcode,
                unit: item.unit,
              };
            });
          }
        };

        const effectScatterData = getEffectScatterData(adcode, datas, data);

        /** 后续需要的话添加，定义圆形的大小 */
        // const minSize = 8;
        // const maxSize = 20;
        // const values = effectScatterData.map((item) => item.value[2]);
        // const minValue = Math.min(...values);
        // const maxValue = Math.max(...values);

        const option = {
          tooltip: {
            z: 9,
            formatter: (params: any) => {
              if (params.componentSubType === "effectScatter") {
                return `${params.data.name}: ${params.data.value[2]} ${
                  params.data.unit || ""
                }`;
              } else {
                return "";
              }
            },
          },
          backgroundColor: "transparent",
          geo: createGeo(mapKey),
          series: [
            {
              type: "map",
              roam: false,
              layoutCenter: ["50%", "50%"],
              layoutSize: "100%",
              itemStyle: {
                normal: {
                  borderColor: "#9ac4da",
                  borderWidth: 1,
                  areaColor: "#2ab8ff88",
                },
                emphasis: {
                  areaColor: "#049d9599",
                  borderWidth: 0,
                  color: "green",
                },
              },
              label: {
                show: false,
                textStyle: {
                  color: "#ffffff",
                },
                emphasis: {
                  show: true,
                  color: "#f9ca24", // 鼠标移上去仍然是白色
                  fontWeight: "bold",
                },
              },
              zoom: 1,
              map: mapKey,
              data: data,
              toolTip: {
                show: true,
              },
            },
            {
              type: "effectScatter",
              coordinateSystem: "geo",
              showEffectOn: "render",
              zlevel: 1,
              rippleEffect: {
                period: 15,
                scale: 4,
                brushType: "fill",
              },
              hoverAnimation: true,
              label: {
                show: true,
                formatter: "{b}",
                position: "bottom",
                offset: [0, 10],
                color: "#e9b61d",
                fontSize: 14,
                fontWeight: "bold",
              },
              /** 颜色自定义 */
              itemStyle: {
                color: function (params: { value: number[] }) {
                  const value = Math.min(params.value[2], 1000); // 限制最大值为 1000

                  let thresholds = [0, 200, 400, 600, 800, 1000]; // 对应6个等级
                  if (adcode !== "china") {
                    thresholds = [0, 100, 200, 300, 400, 500]; // 对应6个等级
                  }
                  // 遍历找到所在的区间
                  for (let i = thresholds.length - 1; i >= 0; i--) {
                    if (value >= thresholds[i]) {
                      return colors[i];
                    }
                  }

                  return colors[0]; // fallback（理论上不会触发）
                },
                shadowBlur: 20,
                shadowColor: "#333",
              },
              /** 后续需要的话添加，定义圆形的大小 */
              // symbolSize: function (val: number[]) {
              //   const value = val[2];
              //   if (maxValue === minValue) return (minSize + maxSize) / 2;
              //   return (
              //     minSize +
              //     ((value - minValue) / (maxValue - minValue)) *
              //       (maxSize - minSize)
              //   );
              // },
              symbolSize: 12,
              data: effectScatterData,
            },
          ],
        };
        chartInstance.current.setOption(option);
        currentMap.current = adcode;
      },
      [loadMap]
    );

    const onModalClose = () => {
      setIsModalOpen(false);
    };

    const intervalWork = () => {
      showNextTooltip();
    };

    useEffect(() => {
      const setup = async () => {
        // await setOptions("china");
        await setOptions(650000);
        if (!chartInstance.current) return;

        chartInstance.current.off("click"); // 防止重复绑定
        chartInstance.current.on("click", async (e: any) => {
          const adcode = e.data?.adcode || e.data?.value;
          const data = datas.find((item) => item.adcode == adcode);
          console.log(data);
          setTitle(data.title);
          const id = data?.adcode.toString();
          if (id) {
            setGroupId(id || "");
            setIsModalOpen(true);
          }
        });
      };

      setup();

      return () => {
        chartInstance.current?.dispose();
      };
    }, [setOptions]);

    useImperativeHandle(ref, () => ({
      intervalWork,
    }));
    return (
      <div className="map_box">
        <Modal isOpen={isModalOpen} onClose={onModalClose} title={title}>
          {isModalOpen && <ADCodeList groupId={groupId} />}
        </Modal>
        <div id={id.current} className="map_container" ref={chartRef}></div>
      </div>
    );
  }
);

export default ChartMap;
