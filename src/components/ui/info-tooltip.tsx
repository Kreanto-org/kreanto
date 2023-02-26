import { AiOutlineQuestionCircle } from "react-icons/ai";

const InfoTooltip: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="group relative flex">
      <AiOutlineQuestionCircle />
      <span
        className="transition-display absolute left-1/2 m-4 mx-auto hidden w-[15rem] -translate-x-1/2 
        translate-y-[10px] rounded-md bg-gray-800 py-2 px-3 
        text-sm text-gray-100 group-hover:block"
      >
        {children}
      </span>
    </div>
  );
};

export default InfoTooltip;
