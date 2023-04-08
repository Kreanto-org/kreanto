import type { Chat, User } from "@prisma/client";
import Image from "next/image";
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

const RequestCard: React.FC<{ req: Chat & { members: User[] } }> = ({
  req,
}) => {
  const name = useShortenedName(req.members[0]?.name ?? "");
  const image = req.members[0]?.image;
  const ctx = api.useContext();

  const joinMut = api.chat.printerJoin.useMutation({
    onSuccess: async () => await ctx.invalidate(),
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger className="transition-all hover:-translate-y-[3px] hover:underline">
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
