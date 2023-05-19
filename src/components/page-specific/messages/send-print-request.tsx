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
import { HiDocumentArrowUp } from "react-icons/hi2";
import { Input } from "~/components/ui/input";
import Button from "~/components/ui/button";

const SendPrintRequestButton: React.FC<{ name: string; printerId: string }> = ({
  name,
  printerId,
}) => {
  const reqMut = api.request.request.useMutation();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          className="h-full bg-bg-200 py-3 text-highlight"
          name="Request a print"
        >
          <HiDocumentArrowUp />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Request a print from {name}</AlertDialogTitle>
          <Input />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () =>
              reqMut.mutateAsync({
                printerId: printerId,
                colorChoice: "",
                link: "",
              })
            }
          >
            Send
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SendPrintRequestButton;
