import { ReactNode, useEffect, useRef, useState } from "react";
import "./style.less";
import { DirectionEnum } from "../Card";
import classNames from "classnames";

interface PropsImpl {
  direction: DirectionEnum;
  slot: ReactNode;
}

export default function CardBody({ direction, slot }: PropsImpl) {
  const [show, setShow] = useState(true);
  const [showSlot, setShowSlot] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      setShowSlot(true);
    }, 1000);
  }, []);
  return (
    <div
      className={classNames("card_body_main", `card_body_main_${direction}`)}
    >
      {show && (
        <div
          className={classNames(
            `animate__animated ${
              direction === DirectionEnum.LEFT
                ? "animate__fadeInLeft"
                : "animate__fadeInRight"
            } card_body_filter
          `
          )}
        ></div>
      )}
      {showSlot && <>{slot}</>}
    </div>
  );
}
