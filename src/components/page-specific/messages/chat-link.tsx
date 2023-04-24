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
      className="rounded-lg transition-all hover:bg-black/[9%]  hover:underline"
      href={`/messages/${chat.id}`}
    >
      <div className="flex w-60 items-center gap-3 py-3 pl-3">
        <Image
          src={image ?? ""}
          alt="pfp"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex-col items-center justify-start gap-2">
          <p className="text-xl font-medium">{name}</p>
          <p className="text-sm text-slate-400">{name}</p>
        </div>
      </div>
    </Link>
  );
};

export default ChatLink;
