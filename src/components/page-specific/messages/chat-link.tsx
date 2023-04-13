import type { Chat, User } from "@prisma/client";
import Image from "next/image";
import { useShortenedName } from "~/utils/useShortenedName";
import Link from "next/link";
import { api } from "~/utils/api";

const ChatLink: React.FC<{ chat: Chat & { members: User[] } }> = ({ chat }) => {
  const designerQuery = api.chat.getDesignerFromId.useQuery({ id: chat.id });
  const designer = designerQuery.data;
  const name = useShortenedName(designer?.name ?? "");
  const image = designer?.image;

  return (
    <Link
      className="transition-all hover:-translate-y-[3px] hover:underline"
      href={`/messages/${chat.id}`}
    >
      <div className="flex w-60 items-center gap-3 py-3 pl-3">
        <Image
          src={image ?? ""}
          alt="pfp"
          width={25}
          height={25}
          className="rounded-full"
        />
        <p>{name}</p>
      </div>
    </Link>
  );
};

export default ChatLink;
