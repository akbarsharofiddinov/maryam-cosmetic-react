import React from "react";

interface IProps {
  children: React.ReactNode;
  cls: string;
  type: string;
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomButton: React.FC<IProps> = ({
  children,
  cls,
  type,
  setModal,
}: IProps) => {
  return (
    <>
      <button
        className={
          type === "regular"
            ? `${cls} regular customButton`
            : `${cls} active customButton`
        }
        onClick={() => setModal!(true)}
      >
        {children}
      </button>
    </>
  );
};

export default CustomButton;
