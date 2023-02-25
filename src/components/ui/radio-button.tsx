export interface RadioButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  groupName: string;
  left?: boolean;
  right?: boolean;
  noBg?: boolean;
  selected?: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  groupName,
  className,
  left = false,
  right = false,
  noBg = false,
  selected, // Causes strange behavior
  children,
  ...rest
}) => {
  return (
    <label>
      <input
        type="radio"
        name={groupName}
        className="peer absolute opacity-0"
        checked={selected}
      />
      <div
        className={`flex flex-col items-center border-2 border-x-[1px] border-text-300 p-3 text-text-200 peer-checked:border-text-100 peer-checked:text-text-100 ${
          className ?? ""
        } ${left ? "rounded-l-lg border-l-2" : ""} ${
          right ? "rounded-r-lg border-r-2" : ""
        } ${noBg ? "" : "peer-checked:bg-white/10"}`}
        {...rest}
      >
        {children}
      </div>
    </label>
  );
};

export default RadioButton;
