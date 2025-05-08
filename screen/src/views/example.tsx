import { useState } from "react";
import ChartMap from "../components/map/ChartMap";

function Center() {
  const datas = [
    {
      name: "呼和浩特市",
      adcode: 150100,
      value: 80,
    },
    {
      name: "包头市",
      adcode: 150200,
      value: 180,
    },
    {
      name: "乌鲁木齐市",
      adcode: 650100,
      value: 60,
    },
    {
      name: "克拉玛依市",
      adcode: 650200,
      value: 120,
    },
    {
      name: "吐鲁番市",
      adcode: 650400,
      value: 180,
    },
    {
      name: "昆玉市",
      adcode: 659009,
      value: 120,
    },
    {
      name: "金昌市",
      adcode: 620300,
      value: 38.514238,
    },
    {
      name: "徐州市",
      adcode: 320300,
      value: 117.184811,
    },
  ];

  return (
    <>
      <ChartMap elementId="mapContainer" datas={datas} />
    </>
  );
}

export default Center;
