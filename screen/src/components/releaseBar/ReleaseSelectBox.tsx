import React, { useState } from "react";
import "./style.less"; // 假设我们有一个样式文件
import { TimeRangeEnum } from "@/views/home/index.api";

interface PropsImpl {
  onChange: (value: TimeRangeEnum) => void;
  defaultValue: TimeRangeEnum;
}

interface OptionsImpl {
  value: TimeRangeEnum;
  label: string;
}

export default function ReleaseSelectBox({
  onChange,
  defaultValue,
}: PropsImpl) {
  const options: OptionsImpl[] = [
    // { value: TimeRangeEnum.M6, label: "近6个月" },
    // { value: TimeRangeEnum.M3, label: "近3个月" },
    { value: TimeRangeEnum.M1, label: "余1" },
    { value: TimeRangeEnum.Y1, label: "余2" },
    { value: TimeRangeEnum.Y3, label: "余3" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");
  const getSelectedName = (value: TimeRangeEnum): string => {
    return options.find((item) => item.value === value)?.label || "";
  };
  const [selectedName, setSelectedName] = useState(
    getSelectedName(defaultValue)
  );

  const handleSelect = (value: TimeRangeEnum) => {
    setSelectedValue(value);
    const name = getSelectedName(value);
    setSelectedName(name);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  return (
    <div className={`select_box ${isOpen ? "open" : ""}`}>
      <div className="select_box__selected" onClick={() => setIsOpen(!isOpen)}>
        {selectedName || "请选择"}
        <span className="select_box__arrow">▼</span>
      </div>

      {isOpen && (
        <div className="select_box__options">
          {options.map((option) => (
            <div
              key={option.value}
              className={`select_box__option ${
                selectedValue === option.value ? "selected" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
