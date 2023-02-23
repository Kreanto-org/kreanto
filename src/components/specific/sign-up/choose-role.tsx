import RoleButton from "./role-button";

const ChooseRole: React.FC = ({}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full items-center justify-center">
        <RoleButton
          name="Designer"
          description="Design 3d objects to be printed."
        />
        <RoleButton
          name="Printer"
          description="Print 3d objects for designers."
        />
      </div>
    </div>
  );
};

export default ChooseRole;
