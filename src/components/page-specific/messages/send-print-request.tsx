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
import { useForm } from "react-hook-form";
import Link from "next/link";

interface PrintRequestType {
  colorChoice: string;
  link: string;
}

const SendPrintRequestButton: React.FC<{ name: string; printerId: string }> = ({
  name,
  printerId,
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<PrintRequestType>({
    criteriaMode: "all",
  });

  const reqMut = api.request.request.useMutation();
  const urlRegex =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

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
          <form
            autoComplete="off"
            onKeyDown={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            className="flex w-full flex-col pt-6 pb-3"
          >
            <p className="w-full text-left text-white">Color Choice</p>
            <p className="mt-1 mb-3 w-full text-left text-[1rem] text-text-200">
              Which color do you want your model in? Be sure to discuss with
              this person before you request it to be sure they have enough of
              your color choice.
            </p>

            <Input
              type="text"
              placeholder="Color"
              className="bg-black/20"
              {...register("colorChoice", { required: true })}
            />
            <p className="mt-5 w-full text-left text-white">Link</p>
            <p className="mt-1 mb-3 w-full text-left text-[1rem] text-text-200">
              Add a link to your model here. To learn how to upload your models,
              read more{" "}
              <Link className="underline" href="/info/uploading-models">
                here
              </Link>
              . If you are sharing a tinkercad model, read about how to do so{" "}
              <Link className="underline" href="/info/tinkercad">
                here
              </Link>
              .
            </p>

            <Input
              type="url"
              placeholder="Link"
              className="bg-black/20"
              {...register("link", {
                required: true,
                pattern: urlRegex,
              })}
            />
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              console.log(errors);
              reqMut.mutateAsync({
                printerId: printerId,
                colorChoice: watch("colorChoice"),
                link: watch("link"),
              });
            }}
            disabled={
              !!errors.colorChoice ||
              !!errors.link ||
              !watch("link") ||
              !watch("colorChoice") ||
              !urlRegex.test(watch("link"))
            }
            type="submit"
          >
            Send
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SendPrintRequestButton;
