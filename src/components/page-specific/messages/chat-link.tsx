import type { Chat, User } from "@prisma/client";
import Link from "next/link";
import PersonPreview from "./person-preview";

const ChatLink: React.FC<{
  chat: Chat & { members: User[] };
}> = ({ chat }) => {
  return (
    <Link
      className="rounded-lg transition-all hover:bg-black/[13%]  hover:underline"
      href={`/messages/${chat.id}`}
    >
      <PersonPreview chatId={chat.id} />
    </Link>
  );
};

export default ChatLink;
