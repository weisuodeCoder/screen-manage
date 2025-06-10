import React, { useState } from "react";
import "./style.less"; // 假设我们有一个样式文件

interface PropsImpl {
  onChange: (value: "1" | "2") => void;
  defaultValue: "1" | "2";
}

interface OptionsImpl {
  value: "1" | "2";
  label: string;
}

export default function ReleaseSelectBox({
  onChange,
  defaultValue,
}: PropsImpl) {
  const options: OptionsImpl[] = [
    { value: "1", label: "大走访" },
    { value: "2", label: "大回访" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");
  const getSelectedName = (value: "1" | "2"): string => {
    return options.find((item) => item.value === value)?.label || "";
  };
  const [selectedName, setSelectedName] = useState(
    getSelectedName(defaultValue)
  );

  const handleSelect = (value: "1" | "2") => {
    setSelectedValue(value);
    const name = getSelectedName(value);
    setSelectedName(name);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  return (
    <div className={`r_3_select_box ${isOpen ? "open" : ""}`}>
      {options.map((option) => (
        <div
          className={`box_option ${
            option.value === selectedValue && "selected"
          }`}
          key={option.value}
          onClick={() => handleSelect(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
}
