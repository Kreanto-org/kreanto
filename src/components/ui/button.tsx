const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`rounded-lg bg-bg-200 px-2 py-1 text-highlight ${
        className ?? ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
