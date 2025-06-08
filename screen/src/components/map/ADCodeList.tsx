import { getCenterOneModel } from "@/views/home/index.api";
import { useEffect, useState } from "react";

interface PropsImpl {
  groupId: string;
}
export default function ADCodeList({ groupId }: PropsImpl) {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res: any = await getCenterOneModel({
        pageSize: 99999,
        pageNo: 1,
        column: "value",
        order: "asc",
        groupId: groupId,
      });
      setDatas(res?.result?.records || []);
      console.log("....");
    };

    fetchData();
  }, [groupId]);

  return (
    <div>
      {datas.map((item: any) => (
        <p key={item.id}>
          <span>{item.groupId_dictText}</span>
          <span>{item.time}</span>
          <span>{item.unit}</span>
          <span>{item.value}</span>
        </p>
      ))}
    </div>
  );
}
