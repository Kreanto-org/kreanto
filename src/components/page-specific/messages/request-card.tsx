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
import PersonPreview from "./person-preview";

const RequestCard: React.FC<{ req: Chat & { members: User[] } }> = ({
  req,
}) => {
  const name = useShortenedName(req.members[0]?.name ?? "");
  const ctx = api.useContext();

  const joinMut = api.chat.printerJoin.useMutation({
    onSuccess: async () => await ctx.invalidate(),
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full rounded-lg transition-all hover:bg-black/[13%]">
        <PersonPreview chatId={req.id} req />
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
