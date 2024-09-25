import React from "react";
import { useAppDispatch } from "@/store/hooks/hooks";
import { setModal } from "@/store/maryamSlice/maryamSlice";

interface IProps {
  children: React.ReactNode;
}

const Login: React.FC<IProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="modal" onClick={() => dispatch(setModal(false))}>
        <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
          {children}
          <button
            className="closeModal-btn"
            onClick={() => dispatch(setModal(false))}
          >
            &times;
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
