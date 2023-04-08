const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`rounded-lg bg-bg-200 px-3 py-[0.4rem] text-highlight transition-all hover:bg-bg-200/60 disabled:opacity-50 ${
        className ?? ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
