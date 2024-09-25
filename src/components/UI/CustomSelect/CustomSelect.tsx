import React from "react";

interface IProps {
  children: React.ReactNode;
  cls: string;
}

const CustomSelect: React.FC<IProps> = ({ children, cls }: IProps) => {
  return (
    <>
      <div className={`select-item ${cls}`}>{children}</div>
    </>
  );
};

export default CustomSelect;
