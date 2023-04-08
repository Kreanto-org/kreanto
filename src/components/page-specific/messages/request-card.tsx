import type { Chat, User } from "@prisma/client";
import Image from "next/image";
import { useShortenedName } from "~/utils/useShortenedName";

const RequestCard: React.FC<{ req: Chat & { members: User[] } }> = ({
  req,
}) => {
  const name = useShortenedName(req.members[0]?.name ?? "");
  const image = req.members[0]?.image;

  return (
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
  );
};

export default RequestCard;
