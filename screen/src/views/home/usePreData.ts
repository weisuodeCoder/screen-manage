import {
  getCenterOneDatas,
  getCenterTwoDatas,
  getLeftOneDatas,
  getLeftThreeDatas,
  getLeftTwoDatas,
  getRightOneDatas,
  getRightThreeDatas,
  getRightTwoDatas,
  getTitles,
  TimeRangeEnum,
  TimeRangeThreeEnum,
} from "./index.api";
import { SlotListImpl } from "../design/types";
import { useCallback } from "react";
import { ReleaseDatasImpl } from "@/components/releaseBar/ReleaseBar";
import { FadeLineDatas } from "@/components/fadeInLine/FadeLine";
import { DataCardDatasImpl } from "@/components/dataCard/DataCard";

type SlotListType = [SlotListImpl, SlotListImpl, SlotListImpl];

interface TitleDataImpl {
  title: string;
  subTitle: string;
}
type TitleArrType = [TitleDataImpl, TitleDataImpl, TitleDataImpl];
export function usePreData() {
  const preTitles = useCallback(async (): Promise<
    [{ title: string; subTitle: string }, TitleArrType, TitleArrType]
  > => {
    try {
      const res: any = await getTitles({ column: "sort", order: "asc" });
      const [dataOne, ...datas] = res.result.records;

      const leftArr = datas.splice(0, 3);
      const rightArr = datas.splice(0, 3);

      return [
        { title: dataOne.title, subTitle: dataOne.subTitle },
        leftArr,
        rightArr,
      ];
    } catch (error) {
      console.error("Failed to fetch titles:", error);
      const arr: TitleArrType = [
        { title: "", subTitle: "" },
        { title: "", subTitle: "" },
        { title: "", subTitle: "" },
      ];
      return [{ title: "", subTitle: "" }, arr, arr];
    }
  }, []);

  const preLeftOneDatas = useCallback(async () => {
    const res: any = await getLeftOneDatas();
    return res.result;
  }, []);

  const preLeftTwoDatas = useCallback(
    async (timeRange: TimeRangeEnum): Promise<ReleaseDatasImpl> => {
      const res: any = await getLeftTwoDatas({ timeRange: timeRange });
      const data: ReleaseDatasImpl = {
        xDatas: [],
        yDatas: [],
      };
      if (res.result.screenLeftTwoXs && res.result.screenLeftTwoYs) {
        (data.xDatas = res.result.screenLeftTwoXs.map(
          (item: any) => item.name
        )),
          (data.yDatas = generateYData(
            res.result.screenLeftTwoXs,
            res.result.screenLeftTwoYs
          ));
      }
      return data;

      function generateYData(x: any[], y: any[]): any[] {
        const names: Record<string, any> = {};
        for (const item of y) {
          if (names[item.name]) {
            names[item.name].push(item);
          } else {
            names[item.name] = [item];
          }
        }
        return Object.keys(names).map((key) => {
          return {
            name: key,
            colors: names[key][0].colors.split(","),
            datas: x.map((xItem) => {
              return (
                names[key].find(
                  (nameItem: any) => nameItem.xdata === xItem.value
                )?.value || 0
              );
            }),
          };
        });
      }
    },
    []
  );

  const preLeftThreeDatas = useCallback(
    async (timeRange: TimeRangeThreeEnum): Promise<FadeLineDatas> => {
      const res: any = await getLeftThreeDatas({ timeRange: timeRange });
      const datas: FadeLineDatas = {
        xDatas: [],
        yDatas: [],
      };
      if (res.result) {
        datas.xDatas = res.result.screenLeftThreeXES?.map(
          (item: any) => item.value
        );

        datas.yDatas =
          res.result.screenLeftThreeYS?.map((item: any) => {
            return {
              name: item.name,
              datas: JSON.parse(item.datas),
              id: item.id,
              color:
                item.color?.length === 9 ? item.color.slice(0, 7) : item.color,
            };
          }) || [];
      }
      return datas;
    },
    []
  );

  const preRightOneDatas = useCallback(async (): Promise<DataCardDatasImpl> => {
    const res: any = await getRightOneDatas();
    const datas: DataCardDatasImpl = {
      datas: [],
      group: [
        { title: "", value: 0 },
        { title: "", value: 0 },
      ],
    };
    if (res.result) {
      const map: Record<string, any> = {};
      let index = 1;
      for (const item of res.result) {
        if (map[item.gid]) {
          map[item.gid].value += Number(item.value);
        } else {
          map[item.gid] = {
            index: index,
            value: Number(item.value),
            title: item.title,
          };
          index++;
        }
      }
      datas.datas = res.result;
      const arr = Object.values(map).sort((a, b) => a.index - b.index);
      if (arr?.[0]?.title) datas.group[0].title = arr[0].title;
      if (arr?.[0]?.value) datas.group[0].value = arr[0].value;
      if (arr?.[1]?.title) datas.group[1].title = arr[1].title;
      if (arr?.[1]?.value) datas.group[1].value = arr[1].value;
    }
    return datas;
  }, []);

  const preRightTwoDatas = useCallback(async () => {
    const res: any = await getRightTwoDatas({
      pageSize: 99999,
      pageNo: 1,
    });
    return res.result.records || [];
  }, []);

  const preRightThreeDatas = useCallback(async () => {
    const res: any = await getRightThreeDatas({
      column: "value",
      order: "asc",
      pageNo: 1,
      pageSize: 99999,
    });

    return res?.result?.records || [];
  }, []);

  const preCenterOneDatas = useCallback(async () => {
    const res: any = await getCenterOneDatas({});
    return res?.result || [];
  }, []);

  const preCenterTwoDatas = useCallback(async () => {
    const res: any = await getCenterTwoDatas({
      column: "sort",
      order: "asc",
      pageNo: 1,
      pageSize: 99999,
    });
    return res?.result?.records || [];
  }, []);

  return {
    preTitles,
    preLeftOneDatas,
    preLeftTwoDatas,
    preLeftThreeDatas,
    preRightOneDatas,
    preRightTwoDatas,
    preRightThreeDatas,
    preCenterOneDatas,
    preCenterTwoDatas,
  };
}
