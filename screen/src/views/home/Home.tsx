import { useEffect, useRef, useState } from "react";
import "./style.less";

// 组件
import {
  Pie,
  GradientLine,
  FadeLine,
  ReleaseBar,
  HorizontalBar,
  ChartMap,
  ThreeDPie,
  DataListCard,
  DataCard,
} from "@/components/index";

import Loading from "../design/main/loading/Loading";
import Title from "../design/title/Title";
import Left from "../design/left/Left";
import Center from "../design/center/Center";
import Right from "../design/right/Right";
import { SlotListImpl } from "../design/types";
import { usePreData } from "./usePreData";
import { TimeRangeEnum, TimeRangeThreeEnum } from "./index.api";
import { IntervalWorkRef } from "../type";
import { Modal } from "antd";

type SlotListType = [SlotListImpl, SlotListImpl, SlotListImpl];
type CenterListType = [SlotListImpl, SlotListImpl];

export default function Home() {
  const {
    preTitles,
    preLeftOneDatas,
    preLeftTwoDatas,
    preLeftThreeDatas,
    preRightOneDatas,
    preRightTwoDatas,
    preRightThreeDatas,
    preCenterOneDatas,
    preCenterTwoDatas,
  } = usePreData();

  const LEFT_TWO_DEFAULT_SELECTED = "1";
  const LEFT_THREE_DEFAULT_SELECTED = TimeRangeThreeEnum.year;
  const RIGHT_THREE_DEFAULT_SELECTED = "1";

  const [leftList, setLeftList] = useState<SlotListType>();
  const [centerList, setCenterList] = useState<CenterListType>();
  const [rightList, setRightList] = useState<SlotListType>();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const leftOneRef = useRef<IntervalWorkRef>(null);
  const leftTwoRef = useRef<IntervalWorkRef>(null);
  const leftThreeRef = useRef<IntervalWorkRef>(null);
  const rightOneRef = useRef<IntervalWorkRef>(null);
  const rightTwoRef = useRef<IntervalWorkRef>(null);
  const rightThreeRef = useRef<IntervalWorkRef>(null);
  const centerOneRef = useRef<IntervalWorkRef>(null);

  const interval = useRef<NodeJS.Timeout>(null);

  const intervalWork = () => {
    leftOneRef.current?.intervalWork?.();
    leftTwoRef.current?.intervalWork?.();
    leftThreeRef.current?.intervalWork?.();
    rightOneRef.current?.intervalWork?.();
    rightTwoRef.current?.intervalWork?.();
    rightThreeRef.current?.intervalWork?.();
    centerOneRef.current?.intervalWork?.();
  };

  const fetchData = async () => {
    try {
      const [{ title, subTitle }, leftTitleArr, rightTitleArr] =
        await preTitles();
      setTitle(title);
      setSubTitle(subTitle);

      // TODO: 不管什么情况，都要返回数据，根据数据判断是否渲染组件
      const leftOneRes = await preLeftOneDatas();
      const leftTwoRes = await preLeftTwoDatas(LEFT_TWO_DEFAULT_SELECTED);
      const leftThreeRes = await preLeftThreeDatas(LEFT_THREE_DEFAULT_SELECTED);
      const rightOneRes = await preRightOneDatas();
      const reghtTwoRes = await preRightTwoDatas();
      const reghtThreeRes = await preRightThreeDatas(
        RIGHT_THREE_DEFAULT_SELECTED
      );
      const centerOneRes = await preCenterOneDatas();
      const centerTwoRes = await preCenterTwoDatas();

      // 更新leftList，确保Pie组件能获取到最新数据
      setLeftList([
        {
          title: leftTitleArr[0].title,
          subtitle: leftTitleArr[0].subTitle,
          slot: <Pie ref={leftOneRef} datas={leftOneRes} />,
        },
        {
          title: leftTitleArr[1].title,
          subtitle: leftTitleArr[1].subTitle,
          slot: (
            <ReleaseBar
              ref={leftTwoRef}
              datas={leftTwoRes}
              defaultSelected={LEFT_TWO_DEFAULT_SELECTED}
              preLeftTwoDatas={preLeftTwoDatas}
            />
          ),
        },
        {
          title: leftTitleArr[2].title,
          subtitle: leftTitleArr[2].subTitle,
          slot: (
            <FadeLine
              ref={leftThreeRef}
              datas={leftThreeRes}
              defaultValue={LEFT_THREE_DEFAULT_SELECTED}
              preLeftThreeDatas={preLeftThreeDatas}
            />
          ),
        },
      ]);

      setCenterList([
        {
          title: "",
          subtitle: "",
          slot: (
            <ChartMap
              ref={centerOneRef}
              elementId="mapContainer"
              datas={centerOneRes}
            />
          ),
        },
        {
          title: "",
          subtitle: "",
          slot: <DataListCard datas={centerTwoRes} />,
        },
      ]);

      setRightList([
        {
          title: rightTitleArr[0].title,
          subtitle: rightTitleArr[0].subTitle,
          slot: <DataCard ref={rightOneRef} datas={rightOneRes} />,
        },
        {
          title: rightTitleArr[1].title,
          subtitle: rightTitleArr[1].subTitle,
          slot: <ThreeDPie ref={rightTwoRef} datas={reghtTwoRes} />,
        },
        {
          title: rightTitleArr[2].title,
          subtitle: rightTitleArr[2].subTitle,
          overflowScroll: true,
          slot: (
            <HorizontalBar
              ref={rightThreeRef}
              datas={reghtThreeRes}
              defaultValue={RIGHT_THREE_DEFAULT_SELECTED}
              preRightThreeDatas={preRightThreeDatas}
            />
          ),
        },
      ]);
      setLoading(false);
    } catch (e) {
      console.error("数据加载失败:", e);
      setLoading(false);
    }
  };

  const isFullscreen = () => {
    const d = document as any;
    return !!(
      d.fullscreenElement ||
      d.webkitFullscreenElement ||
      d.mozFullScreenElement ||
      d.msFullscreenElement
    );
  };

  const requestFullscreen = () => {
    const element = document.documentElement as any;
    element?.requestFullscreen?.();
    element?.webkitRequestFullscreen?.();
    element?.mozRequestFullScreen?.();
    element?.msRequestFullscreen?.();
  };

  useEffect(() => {
    if (!isFullscreen()) {
      Modal.confirm({
        title: "温馨提示",
        content: "全屏体验更佳，是否立即全屏？",
        okText: "全屏",
        cancelText: "取消",
        onOk: () => {
          requestFullscreen();
          return Promise.resolve();
        },
        onCancel: () => {
          return Promise.resolve();
        },
        afterClose: () => {
          fetchData();
          intervalWork();
          interval.current = setInterval(intervalWork, 3000);
        },
      });
    }

    return () => {
      if (interval.current) clearInterval(interval.current);
      interval.current = null;
    };
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div className="home_main">
          <div className="header_main">
            <Title title={title} subTitle={subTitle} />
          </div>
          <div className="body_main">
            <div className="common_lr">
              {leftList && <Left slotList={leftList} />}
            </div>
            <div className="common_center">
              {centerList && <Center slotList={centerList} />}
            </div>
            <div className="common_lr">
              {rightList && <Right slotList={rightList} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
