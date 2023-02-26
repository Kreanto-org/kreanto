import { AiOutlineQuestionCircle } from "react-icons/ai";

const InfoTooltip: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="group relative flex">
      <AiOutlineQuestionCircle />
      <span
        className="absolute left-1/2 m-4 mx-auto w-[15rem] -translate-x-1/2 translate-y-[10px] rounded-md 
        bg-gray-800 py-2 px-3 text-sm text-gray-100 
        opacity-0 transition-opacity group-hover:opacity-100"
      >
        {message}
      </span>
    </div>
  );
};

export default InfoTooltip;
