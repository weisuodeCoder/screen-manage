import LoadingSvg from "@/assets/svg/loading.svg";
import "./style.less";

export default function Loading() {
  return (
    <div className="loading_main">
      <div className="svg_box">
        <span className="loading_text">加载中...</span>
        <img className="loading_spinner" src={LoadingSvg} alt="loading" />
      </div>
    </div>
  );
}
