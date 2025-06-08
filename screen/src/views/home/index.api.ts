import defHttp from "@/api/index";

enum Api {
  getTitles = "/getTitleList",
  getLeftOneDatas = "/getLeftOneDatas",
  getLeftTwoDatas = "/getLeftTwoDatas",
  getLeftThreeDatas = "/getLeftThreeDatas",
  getRightOneDatas = "/getRightOneDatas",
  getRightTwoDatas = "/getRightTwoDatas",
  getRightThreeDatas = "/getRightThreeDatas",
  getCenterOneDatas = "/getCenterOneDatas",
  getCenterOneModel = "/getCenterOneModel",
  getCenterTwoDatas = "/getCenterTwoDatas",
}

export enum TimeRangeEnum {
  Y3 = "Y3",
  Y1 = "Y1",
  M6 = "M6",
  M3 = "M3",
  M1 = "M1",
}

export enum TimeRangeThreeEnum {
  year = "year", // 自有数据以来的年
  last12 = "last12", // 往前推12个月
  currentYear = "currentYear", // 1月到当前月
}

export const getTitles = (params: Record<string, any>) =>
  defHttp.get(Api.getTitles, { params });

export const getLeftOneDatas = () => defHttp.get(Api.getLeftOneDatas);

export const getLeftTwoDatas = (params: Record<"timeRange", TimeRangeEnum>) => {
  return defHttp.get(Api.getLeftTwoDatas, { params });
};

export const getLeftThreeDatas = (
  params: Record<"timeRange", TimeRangeThreeEnum>
) => {
  return defHttp.get(Api.getLeftThreeDatas, { params });
};

export const getRightOneDatas = () => defHttp.get(Api.getRightOneDatas);

export const getRightTwoDatas = (params: any) =>
  defHttp.get(Api.getRightTwoDatas, { params });

export const getRightThreeDatas = (params: any) =>
  defHttp.get(Api.getRightThreeDatas, { params });

export const getCenterOneDatas = (params: any) =>
  defHttp.get(Api.getCenterOneDatas, { params });

export const getCenterOneModel = (params: any) =>
  defHttp.get(Api.getCenterOneModel, { params });

export const getCenterTwoDatas = (params: any) =>
  defHttp.get(Api.getCenterTwoDatas, { params });
