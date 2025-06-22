import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import HorizontalSelectBox from "./HorizontalSelectBox";
import { IntervalWorkRef } from "@/views/type";
import "./style.less";
import classNames from "classnames";

interface Props {
  datas: any[];
  defaultValue: "1" | "2";
  preRightThreeDatas: (value: "1" | "2") => Promise<any[]>;
}

const FadeLine = forwardRef<IntervalWorkRef, Props>(
  ({ datas, defaultValue, preRightThreeDatas }, ref) => {
    const [currentDatas, setCurrentDatas] = useState<any[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const currentRowRef = useRef(0);
    const [currentRowIndex, setCurrentRowIndex] = useState(0);
    const [count, setCount] = useState(0);
    const isMouseEnter = useRef(false);

    const computeCount = () => {
      setCurrentRowIndex(0);
      currentRowRef.current = 0;

      setCurrentDatas(() => {
        const newDatas = datas;
        let count = 0;
        newDatas.forEach((item) => (count += item.value));
        setCount(count);
        return newDatas;
      });
    };

    // 计算容器高度和行高
    const getRowHeight = () => {
      return containerRef.current
        ? containerRef.current.clientHeight * 0.25
        : 0;
    };

    // 滚动到下一行
    const intervalWork = () => {
      if (isMouseEnter.current) return;
      if (
        !containerRef.current ||
        !contentRef.current ||
        currentDatas.length <= 1
      )
        return;

      const container = containerRef.current;
      const rowHeight = getRowHeight();

      // 计算下一行位置
      currentRowRef.current = (currentRowRef.current + 1) % currentDatas.length;
      const scrollTop = currentRowRef.current * rowHeight;
      setCurrentRowIndex(currentRowRef.current);

      // 实现平滑滚动
      container.style.scrollBehavior = "smooth";
      container.scrollTop = scrollTop;

      // 滚动结束后处理循环逻辑
      const handleScrollEnd = () => {
        container.style.scrollBehavior = "auto";

        // 如果滚动到最后一行，重置到顶部
        if (currentRowRef.current === currentDatas.length - 1) {
          // 将第一项移到最后
          const firstItem = contentRef.current?.children[0];
          firstItem && contentRef.current?.appendChild(firstItem);

          // 重置滚动位置
          container.scrollTop = 0;
          currentRowRef.current = 0;
        }

        container.removeEventListener("scroll", handleScrollEnd);
      };

      container.addEventListener("scroll", handleScrollEnd);
    };

    const onChange = async (value: "1" | "2") => {
      const res = await preRightThreeDatas(value);
      datas = res;
      computeCount();
    };

    const onSelectItem = (index: number) => {
      setCurrentRowIndex(index);
      currentRowRef.current = index;
    };

    const onMouseEnter = () => {
      isMouseEnter.current = true;
    };

    const onMouseLeave = () => {
      isMouseEnter.current = false;
      // 恢复自动滚动前重置位置
      if (containerRef.current && currentRowRef.current !== 0) {
        const rowHeight = getRowHeight();
        containerRef.current.scrollTop = currentRowRef.current * rowHeight;
      }
    };

    useEffect(() => {
      computeCount();
    }, []);
    // 暴露给外部的方法
    useImperativeHandle(ref, () => ({
      intervalWork: intervalWork,
    }));

    return (
      <div
        className="r_3_main"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <HorizontalSelectBox defaultValue={defaultValue} onChange={onChange} />

        <div ref={containerRef} className="container_box">
          <div ref={contentRef}>
            {currentDatas.map((item, index) => (
              <div
                key={item.id}
                className="item_box"
                onMouseEnter={() => onSelectItem(index)}
              >
                <div
                  className={classNames(
                    `sort_box ${!index && "sort_1"} ${
                      index === 1 && "sort_2"
                    } ${index === 2 && "sort_3"}`
                  )}
                >
                  {index + 1}
                </div>
                <div className="content_box">
                  <div className="text_box">
                    <span>{item.name_dictText}</span>
                    <span>
                      <span style={{ color: "#0e897d" }}>{item.value}</span>
                      <span style={{ color: "#455059" }}>{item.unit}</span>
                    </span>
                  </div>
                  <div className="progress_box">
                    {currentRowIndex === index && (
                      <div
                        className={classNames(`toltip_box`)}
                        style={{ left: `${(item.value / count) * 100 + 2}%` }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "1vw",
                          }}
                        >
                          <div style={{ fontWeight: "bold" }}>
                            {item.name_dictText}
                          </div>
                          <div>
                            {item.value}
                            {item.unit}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <div>
                            占比:{((item.value / count) * 100).toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    )}
                    <div
                      className="progress"
                      style={{
                        width: `${(item.value / count) * 100}%`,
                        background: `linear-gradient(to right, ${item.colorOne}, ${item.colorTwo})`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default FadeLine;
