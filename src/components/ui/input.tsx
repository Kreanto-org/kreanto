const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...rest
}) => {
  return (
    <input
      {...rest}
      className={`w-full rounded-lg bg-bg-300 px-3 py-[10px] outline-none ${
        className ?? ""
      }`}
    />
  );
};

export default Input;
