import type { UseFormRegisterReturn } from "react-hook-form";
import Input from "~/components/ui/input";

const AgeLocation: React.FC<{
  ageData: UseFormRegisterReturn;
  locData: UseFormRegisterReturn;
}> = ({ ageData, locData }) => {
  return (
    <div>
      <p>
        Age:<span style={{ color: "red" }}> *</span>
      </p>

      <Input required placeholder="Age" {...ageData} />

      <p>
        Location:<span style={{ color: "red" }}> *</span>
      </p>

      <Input required placeholder="Location" {...locData} />
    </div>
  );
};

export default AgeLocation;
