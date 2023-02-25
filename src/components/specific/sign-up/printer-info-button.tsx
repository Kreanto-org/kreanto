import RadioButton, {
  type RadioButtonProps,
} from "~/components/ui/radio-button";

interface Props extends RadioButtonProps {
  description: string;
}

const PrinterInfoButton: React.FC<Props> = ({
  title,
  description,
  ...rest
}) => {
  return (
    <RadioButton {...rest} className="h-full max-w-[15rem]">
      <h5 className="text-center">{title}</h5>
      <p className="text-center text-[1rem]">{description}</p>
    </RadioButton>
  );
};

export default PrinterInfoButton;
