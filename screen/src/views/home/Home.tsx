import { useEffect, useRef, useState } from "react";
import "./style.less";
import Title from "../design/title/Title";
import Left from "../design/left/Left";
import Center from "../design/center/Center";
import Right from "../design/right/Right";
import { SlotListImpl } from "../design/types";
// 组件
import Pie from "@/components/pie/Pie";
import GradientLine from "@/components/gradientLine/GradientLine";
import FadeLine from "@/components/fadeInLine/FadeLine";
import ReleaseBar from "@/components/releaseBar/ReleaseBar";
import HorizontalBar from "@/components/horizontalBar/HorizontalBar";
import ChartMap from "@/components/map/ChartMap";
import ThreeDPie from "@/components/3dPie/ThreeDPie";
import { centerDatas } from "./datas";

// 队伍教育
// 分班情况
// 三学成绩

// 智慧功监
// 技能培训
// 大走访、大回访

type SlotListType = [SlotListImpl, SlotListImpl, SlotListImpl];

export default function Home() {
  const [leftList, setLeftList] = useState<SlotListType>([
    {
      title: "队伍教育",
      subtitle: "提升队伍素质，强化纪律意识",
      slot: <Pie />,
    },
    {
      title: "分班情况",
      subtitle: "合理编班结构，优化资源配置",
      slot: <ReleaseBar />,
    },
    {
      title: "三学成绩",
      subtitle: "学训考评结合，全面反映实效",
      slot: <FadeLine />,
    },
  ]);

  const [centerList, setCenterList] = useState<[SlotListImpl]>([
    {
      title: "地图",
      subtitle: "副标题",
      slot: <ChartMap elementId="mapContainer" datas={centerDatas} />,
    },
  ]);

  const [rightList, setRightList] = useState<SlotListType>([
    {
      title: "智慧功鉴",
      subtitle: "智能管控平台，提升监督效能",
      slot: <Pie />,
    },
    {
      title: "技能培训",
      subtitle: "强化实战技能，打造专业人才",
      slot: <ThreeDPie />,
    },
    {
      title: "大走访、大回访",
      subtitle: "深入基层一线，筑牢服务根基",
      slot: <HorizontalBar />,
    },
  ]);

  useEffect(() => {});
  return (
    <div className="home_main">
      <div className="header_main">
        <Title />
      </div>
      <div className="body_main">
        <div className="common_lr">
          <Left slotList={leftList} />
        </div>
        <div className="common_center">
          <Center slotList={centerList} />
        </div>
        <div className="common_lr">
          <Right slotList={rightList} />
        </div>
      </div>
    </div>
  );
}
