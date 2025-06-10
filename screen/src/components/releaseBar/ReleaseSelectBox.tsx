import React, { useState } from "react";
import "./style.less"; // 假设我们有一个样式文件

interface PropsImpl {
  onChange: (value: "1" | "2" | "3") => void;
  defaultValue: "1" | "2" | "3";
}

interface OptionsImpl {
  value: "1" | "2" | "3";
  label: string;
}

export default function ReleaseSelectBox({
  onChange,
  defaultValue,
}: PropsImpl) {
  const options: OptionsImpl[] = [
    { value: "1", label: "余1" },
    { value: "2", label: "余2" },
    { value: "3", label: "余3" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");
  const getSelectedName = (value: "1" | "2" | "3"): string => {
    return options.find((item) => item.value === value)?.label || "";
  };
  const [selectedName, setSelectedName] = useState(
    getSelectedName(defaultValue)
  );

  const handleSelect = (value: "1" | "2" | "3") => {
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
