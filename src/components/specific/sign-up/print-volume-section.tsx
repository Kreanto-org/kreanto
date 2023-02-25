import type { UseFormRegisterReturn } from "react-hook-form";
import Input from "~/components/ui/input";

const PrintVolumeSection: React.FC<{
  lengthData: UseFormRegisterReturn;
  widthData: UseFormRegisterReturn;
  heightData: UseFormRegisterReturn;
}> = ({ lengthData, widthData, heightData }) => {
  return (
    <div>
      <p className="mt-4 w-full text-left">
        Print Volume:<span style={{ color: "red" }}> *</span>
      </p>
      <p className="mb-4 w-full text-left text-[1rem] text-text-200">
        What are the dimensions of your printer?
      </p>

      <div className="flex items-center gap-2">
        <Input required placeholder="Length" {...lengthData} />
        <h6>X</h6>
        <Input required placeholder="Width" {...widthData} />
        <h6>X</h6>
        <Input required placeholder="Height" {...heightData} />
      </div>
    </div>
  );
};

export default PrintVolumeSection;
