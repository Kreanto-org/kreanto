import type { Chat, User } from "@prisma/client";
import { useShortenedName } from "~/utils/useShortenedName";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert";
import { api } from "~/utils/api";
import Image from "next/image";

const RequestCard: React.FC<{ req: Chat & { members: User[] } }> = ({
  req,
}) => {
  const name = useShortenedName(req.members[0]?.name ?? "");
  const image = req.members[0]?.image;
  const ctx = api.useContext();

  const lastMessageQuery = api.message.getLastMessage.useQuery({
    chatId: req.id,
  });
  const lastMessage = lastMessageQuery.data;

  const joinMut = api.chat.printerJoin.useMutation({
    onSuccess: async () => await ctx.invalidate(),
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger className="rounded-lg transition-all hover:bg-black/[13%]">
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
          <p className="mb-auto ml-auto mr-4 text-sm text-slate-300">req</p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Accept message request from {name}?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () =>
              joinMut.mutateAsync({ creator_id: req.members[0]?.id ?? "" })
            }
          >
            Accept
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RequestCard;
