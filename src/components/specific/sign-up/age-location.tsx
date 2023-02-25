import type { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "~/components/ui/input";

const AgeLocation: React.FC<{
  ageData: UseFormRegisterReturn;
  locData: UseFormRegisterReturn;
}> = ({ ageData, locData }) => {
  return (
    <div>
      <p className="mb-1 mt-4 w-full text-left">
        Age:<span style={{ color: "red" }}> *</span>
      </p>

      <Input required placeholder="Age" {...ageData} type="number" />

      <p className="mb-1 mt-4 w-full text-left">
        Location:<span style={{ color: "red" }}> *</span>
      </p>

      <Input required placeholder="Location" {...locData} />
    </div>
  );
};

export default AgeLocation;
