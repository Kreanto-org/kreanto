const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`rounded-lg bg-bg-200 px-3 py-[0.4rem] text-highlight ${
        className ?? ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
