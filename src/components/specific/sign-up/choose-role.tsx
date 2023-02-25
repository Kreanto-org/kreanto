import Button from "~/components/ui/button";
import RoleButton from "./role-button";
import { useState } from "react";

const ChooseRole: React.FC<{
  setValue: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setValue }) => {
  const [role, setRole] = useState("");
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-full items-center justify-center">
        <RoleButton
          name="Designer"
          description="Design 3d objects to be printed."
          onClick={() => setRole("DESIGNER")}
        />
        <RoleButton
          name="Printer"
          description="Print 3d objects for designers."
          onClick={() => setRole("PRINTER")}
        />
      </div>
      <Button onClick={() => setValue(role)}>Confirm</Button>
    </div>
  );
};

export default ChooseRole;
