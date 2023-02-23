import Image from "next/image";

const RoleButton: React.FC<{
  name: string;
  description: string;
  icon?: string;
}> = ({ name, description, icon }) => {
  return (
    <label>
      <input
        type="radio"
        name="signup-role-button"
        id={`signup-role-button-${name}`}
        className="peer opacity-0"
      />
      <div
        className={`flex flex-col items-center rounded-lg border border-text-300 p-3 peer-checked:border-text-100`}
      >
        {icon && (
          <Image width={20} height={20} src={icon} alt={`${name}-icon`} />
        )}
        <h5 className="text-center">{name}</h5>
        <p className="text-center">{description}</p>
      </div>
    </label>
  );
};

export default RoleButton;
