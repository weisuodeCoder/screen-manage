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
}

export default function ADCodeList({ groupId }: PropsImpl) {
  const [datas, setDatas] = useState<TableData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const rowHeight = 50; // 根据实际样式调整行高
  const speed = 0.5; // 滚动速度(px/frame)

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
      startAutoScroll();
    }
    return () => {
      stopAutoScroll();
    };
  }, [datas]);

  const animate = () => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;

    // 向下滚动
    container.scrollTop += speed;

    // 当第一条数据完全滚出视野时
    if (container.scrollTop >= rowHeight) {
      // 1. 将第一条数据移动到最后
      const firstItem = content.children[0];
      content.appendChild(firstItem);

      // 2. 调整scrollTop保持连续性
      container.scrollTop -= rowHeight;
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  const startAutoScroll = () => {
    stopAutoScroll();
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

  return (
    <div
      style={{
        fontSize: "0.7vw",
        padding: "3vh 2vh",
        width: "100%",
        height: "45vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 表头 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          padding: "1vw",
          fontWeight: "bold",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div>名称</div>
        <div>时间</div>
        <div>单位</div>
        <div>值</div>
      </div>

      {/* 滚动容器 */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflow: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {/* 实际内容 - 使用绝对定位实现无缝循环 */}
        <div ref={contentRef}>
          {datas.map((item: TableData) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                padding: "1vw",
                borderBottom: "1px solid #eee",
                height: `${rowHeight}px`,
                boxSizing: "border-box",
              }}
            >
              <div>{item.name}</div>
              <div>{item.time}</div>
              <div>{item.unit}</div>
              <div>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
