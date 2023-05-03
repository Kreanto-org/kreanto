import Image from "next/image";
import { api } from "~/utils/api";
import { useShortenedName } from "~/utils/useShortenedName";

const PersonPreview: React.FC<{ chatId: string; req?: boolean }> = ({
  chatId,
  req = false,
}) => {
  const otherUserQuery = api.chat.getOtherUserInChat.useQuery({ id: chatId });
  const otherUser = otherUserQuery.data;
  const name = useShortenedName(otherUser?.name ?? "");
  const image = otherUser?.image;
  const lastMessageQuery = api.message.getLastMessage.useQuery({
    chatId: chatId,
  });
  const lastMessage = lastMessageQuery.data;

  return (
    <div className="flex w-60 max-w-full items-center gap-3 py-3 pl-3 md:w-96">
      <Image
        src={image ?? ""}
        alt="pfp"
        width={50}
        height={50}
        className="rounded-full"
      />
      <div className="flex-col items-center justify-start gap-2">
        <p className="text-xl font-medium">{name}</p>
        <p className="w-fit text-sm text-slate-400">
          {lastMessage?.text ?? ""}
        </p>
      </div>
      {req ? (
        <p className="mb-auto ml-auto mr-4 text-sm text-slate-300">req</p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PersonPreview;
