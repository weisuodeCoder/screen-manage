import { useEffect, useRef, useState } from "react";
import "./style.less";

interface PropsImpl {
  title: string;
  subTitle: string;
}

export default function Title({ title, subTitle }: PropsImpl) {
  return (
    <div className="title_main">
      <div className="title_center">
        <div className="bg_light"></div>
        <div className="center_text">{title}</div>
        <div className="center_sub_text">{subTitle}</div>
        <div className="title_dress"></div>
      </div>
    </div>
  );
}
