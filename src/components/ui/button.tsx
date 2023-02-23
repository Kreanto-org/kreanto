const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`rounded bg-bg-200 text-highlight ${className ?? ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
