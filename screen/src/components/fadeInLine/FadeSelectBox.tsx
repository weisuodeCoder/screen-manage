import React, { useState } from "react";
import "./style.less"; // 假设我们有一个样式文件
import { TimeRangeEnum, TimeRangeThreeEnum } from "@/views/home/index.api";

interface PropsImpl {
  onChange: (value: TimeRangeThreeEnum) => void;
  defaultValue: TimeRangeThreeEnum;
}

interface OptionsImpl {
  value: TimeRangeThreeEnum;
  label: string;
}

export default function FadeSelectBox({ onChange, defaultValue }: PropsImpl) {
  const options: OptionsImpl[] = [
    { value: TimeRangeThreeEnum.year, label: "近3年" },
    { value: TimeRangeThreeEnum.last12, label: "近1年" },
    { value: TimeRangeThreeEnum.currentYear, label: "近半年" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");
  const getSelectedName = (value: TimeRangeThreeEnum): string => {
    return options.find((item) => item.value === value)?.label || "";
  };
  const [selectedName, setSelectedName] = useState(
    getSelectedName(defaultValue)
  );

  const handleSelect = (value: TimeRangeThreeEnum) => {
    setSelectedValue(value);
    const name = getSelectedName(value);
    setSelectedName(name);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  return (
    <div className={`fade_select_box ${isOpen ? "open" : ""}`}>
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
