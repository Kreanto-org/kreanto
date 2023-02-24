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
    <RadioButton {...rest} className="max-w-[15rem] flex-1">
      <h5 className="text-center">{title}</h5>
      <p className="text-center">{description}</p>
    </RadioButton>
  );
};

export default PrinterInfoButton;
