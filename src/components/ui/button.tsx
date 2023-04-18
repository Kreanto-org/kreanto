import Image from "next/image";
import { cn } from "~/utils/cn";

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
          <Image
            src="/Loading.gif"
            width={16}
            height={16}
            alt="Loading..."
            className="absolute top-auto bottom-auto left-auto right-auto"
          />
          <div className="w-full opacity-0">{children}</div>
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default Button;
