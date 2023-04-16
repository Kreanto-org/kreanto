import { cn } from "~/utils/cn";

const Message: React.FC<
  React.PropsWithChildren<{ isSelf: boolean; first?: boolean; last?: boolean }>
> = ({ isSelf, first = false, last = false, children }) => (
  <p
    className={cn(
      "mx-4 my-[1px] max-w-[60%] whitespace-nowrap break-words rounded-full px-3 py-1",
      isSelf
        ? "ml-auto rounded-r-[2000px] bg-highlight"
        : "mr-auto rounded-l-[2000px] bg-slate-500",
      first ? "rounded-t-full" : "",
      last ? "rounded-b-full" : ""
    )}
  >
    {children}
  </p>
);

export default Message;
