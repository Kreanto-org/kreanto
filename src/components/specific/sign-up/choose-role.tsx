import Button from "~/components/ui/button";
import RoleButton from "./role-button";
import { useState } from "react";

const ChooseRole: React.FC<{
  setValue: React.Dispatch<React.SetStateAction<"" | "DESIGNER" | "PRINTER">>;
}> = ({ setValue }) => {
  const [role, setRole] = useState<"" | "DESIGNER" | "PRINTER">("");
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="my-10 flex w-2/3 items-center justify-evenly">
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
      <Button onClick={() => setValue(role)} disabled={role === ""}>
        Confirm
      </Button>
    </div>
  );
};

export default ChooseRole;
