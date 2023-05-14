import Button from "~/components/ui/button";
import RoleButton from "./role-button";
import { useState } from "react";

const ChooseRole: React.FC<{
  setValue: React.Dispatch<React.SetStateAction<"" | "DESIGNER" | "PRINTER">>;
}> = ({ setValue }) => {
  const [role, setRole] = useState<"" | "DESIGNER" | "PRINTER">("");
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="my-10 flex w-2/3 flex-col items-center justify-evenly gap-4 md:flex-row ">
        <RoleButton
          name="Designer"
          description="For those who may not have access to a 3d printer but would like to participate and fuel their stem experiences."
          onClick={() => setRole("DESIGNER")}
        />
        <RoleButton
          name="Printer"
          description="For those who have access to a 3d printer and would be ready and willing to help people who want to participate."
          onClick={() => setRole("PRINTER")}
        />
      </div>
      <Button
        onClick={() => setValue(role)}
        disabled={role === ""}
        name="Confirm"
      >
        Confirm
      </Button>
    </div>
  );
};

export default ChooseRole;
