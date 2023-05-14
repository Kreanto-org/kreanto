import type { Chat, User } from "@prisma/client";
import Link from "next/link";
import PersonPreview from "./person-preview";
import { api } from "~/utils/api";

const ChatLink: React.FC<{
  chat: Chat & { members: User[] };
}> = ({ chat }) => {
  const getPersonQuery = api.chat.getOtherUserInChat.useQuery({ id: chat.id });
  const name = getPersonQuery.data?.name;
  return (
    <Link
      className="rounded-lg transition-all hover:bg-black/[13%]  hover:underline"
      href={`/messages/${chat.id}`}
      aria-label={"Chat with " + name}
    >
      <PersonPreview chatId={chat.id} />
    </Link>
  );
};

export default ChatLink;
