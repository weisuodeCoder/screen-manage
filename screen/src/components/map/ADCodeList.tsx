import { getCenterOneModel } from "@/views/home/index.api";
import { useEffect, useState, useRef } from "react";

interface PropsImpl {
  groupId: string;
}

interface TableData {
  id: string;
  groupId_dictText: string;
  time: string;
  unit: string;
  value: string;
  name?: string; // 添加缺失的类型定义
  remark?: string; // 添加缺失的类型定义
}

export default function ADCodeList({ groupId }: PropsImpl) {
  const [datas, setDatas] = useState<TableData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const rowHeight = 50; // 根据实际样式调整行高
  const speed = 1; // 滚动速度(px/frame)

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
    };

    fetchData();
  }, [groupId]);

  useEffect(() => {
    if (datas.length > 0) {
      // 添加延迟确保DOM已更新
      setTimeout(startAutoScroll, 100);
    }
    return () => {
      stopAutoScroll();
    };
  }, [datas]);

  const animate = () => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;

    // 只有内容高度超过容器高度时才滚动
    if (content.scrollHeight <= container.clientHeight) {
      return;
    }

    container.scrollTop += speed;

    // 当第一条数据完全滚出视野时
    if (container.scrollTop >= rowHeight) {
      // 1. 将第一条数据移动到最后
      const firstItem = content.children[0];
      content.appendChild(firstItem.cloneNode(true));
      content.removeChild(firstItem);

      // 2. 调整scrollTop保持连续性
      container.scrollTop -= rowHeight;
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  const startAutoScroll = () => {
    stopAutoScroll();
    if (containerRef.current && contentRef.current) {
      containerRef.current.scrollTop = 0; // 重置滚动位置
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  const stopAutoScroll = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = undefined;
    }
  };

  const handleMouseEnter = () => {
    stopAutoScroll();
  };

  const handleMouseLeave = () => {
    startAutoScroll();
  };

  useEffect(() => {
    console.log("Container height:", containerRef.current?.clientHeight);
    console.log("Content height:", contentRef.current?.scrollHeight);
  }, [datas]);

  return (
    <div
      style={{
        zIndex: 9999,
        fontSize: "0.7vw",
        padding: "3vh 2vh",
        width: "42vw",
        height: "45vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 表头 */}
      <div
        style={{
          width: "100%",
          padding: "1vw",
          fontWeight: "bold",
          borderBottom: "1px solid #ddd",
          display: "flex",
          flexDirection: "row",
          color: "#f3a33c",
        }}
      >
        <div style={{ width: "22%" }}>名称</div>
        <div style={{ width: "10%" }}>数量</div>
        <div style={{ width: "10%" }}>单位</div>
        <div>备注</div>
      </div>

      {/* 滚动容器 */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          flex: 1,
          overflow: "hidden",
          position: "relative", // 添加相对定位
        }}
      >
        {/* 实际内容 */}
        <div
          ref={contentRef}
          style={{
            position: "relative", // 添加相对定位
          }}
        >
          {datas.map((item: TableData) => (
            <div
              key={item.id}
              style={{
                width: "100%",
                padding: "1vw",
                borderBottom: "1px solid #eee",
                height: `${rowHeight}px`,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div style={{ width: "22%" }}>{item.name}</div>
              <div style={{ width: "10%" }}>{item.value}</div>
              <div style={{ width: "10%" }}>{item.unit}</div>
              <div>{item.remark}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
