import Image from "next/image";
import RadioButton from "~/components/ui/radio-button";

const RoleButton: React.FC<{
  name: string;
  description: string;
  icon?: string;
}> = ({ name, description, icon }) => {
  return (
    <RadioButton
      groupName="signup-role-button"
      className="peer-checked:shadow-[2px_2px_0px_0px_rgba(224,224,224,1)]"
      left
      right
    >
      {icon && <Image width={20} height={20} src={icon} alt={`${name}-icon`} />}
      <h5 className="text-center">{name}</h5>
      <p className="text-center">{description}</p>
    </RadioButton>
  );
};

export default RoleButton;
