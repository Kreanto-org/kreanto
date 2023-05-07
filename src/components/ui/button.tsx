import { cn } from "~/utils/cn";
import Loading from "../shared/loading";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  children,
  className,
  loading = false,
  disabled,
  ...rest
}) => {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={cn(
        `rounded-lg bg-bg-200 px-3 py-[0.4rem] text-highlight transition-all hover:bg-bg-200/60 disabled:opacity-5`,
        className
      )}
    >
      {loading ? (
        <div className="relative flex items-center justify-center">
          <Loading size={16} className="absolute" />
          <div className="w-full opacity-0">{children}</div>
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default Button;
