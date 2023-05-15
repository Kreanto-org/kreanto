import type { Message as PrismaMessage } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { api } from "~/utils/api";
import { cn } from "~/utils/cn";

const Message: React.FC<
  React.PropsWithChildren<{
    message: PrismaMessage;
    first?: boolean;
    last?: boolean;
  }>
> = ({ message, first = false, last = false, children }) => {
  const { data: sessionData } = useSession();
  const isSelf = message.userId === sessionData?.user.id;

  const otherPersonInChatQuery = api.chat.getOtherUserInChat.useQuery({
    id: message.chatId,
  });
  const otherPersonInChat = otherPersonInChatQuery.data;

  return (
    <div className="flex flex-1">
      <div className="mx-1 w-[37px]">
        {last && !isSelf && (
          <Image
            src={otherPersonInChat?.image ?? ""}
            className="rounded-full"
            alt="Person"
            width={35}
            height={35}
          />
        )}
      </div>
      <div className="mx-2 flex flex-1 flex-col items-start justify-start">
        {first && !isSelf && (
          <p className="text-[0.9rem] text-text-200">
            {otherPersonInChat?.name}
          </p>
        )}
        <p
          className={cn(
            "my-[1px] max-w-[60%] whitespace-nowrap break-words rounded-full px-3 py-1",
            isSelf
              ? "ml-auto rounded-r-[2000px] bg-highlight"
              : "mr-auto rounded-l-[2000px] bg-slate-500",
            first ? "rounded-t-full" : "",
            last ? "rounded-b-full" : ""
          )}
        >
          {children}
        </p>
      </div>
    </div>
  );
};

export default Message;
