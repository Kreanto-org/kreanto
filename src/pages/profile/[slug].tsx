import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { BsStar, BsStarFill } from "react-icons/bs";
import PrinterInfoSection from "~/components/page-specific/profile/printer-info-section";
import ResponseInfoSection from "~/components/page-specific/profile/response-info-section";
import Layout from "~/components/shared/layout";
import Button from "~/components/ui/button";
import { api } from "~/utils/api";
import { useLastActiveString } from "~/utils/lastActiveString";
import ConfettiExplosion from "react-confetti-explosion";

const ProfilePage: React.FC = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  const slug = router.query.slug?.toString() ?? "";
  const userQuery = api.user.findUnique.useQuery({ slug });
  const user = userQuery.data;
  const ctx = api.useContext();
  const lastActive = useLastActiveString(user?.lastActive);

  const messageMut = api.chat.create.useMutation({
    onSuccess: async () => {
      await ctx.invalidate();
    },
  });
  const starMut = api.user.starPrinter.useMutation({
    onSuccess: async () => {
      await ctx.invalidate();
    },
  });
  const unStarMut = api.user.unStarPrinter.useMutation({
    onSuccess: async () => {
      await ctx.invalidate();
    },
  });

  const requestedQuery = api.chat.checkRequested.useQuery({
    recipientId: user?.id ?? "",
  });
  const starredQuery = api.user.hasStarred.useQuery({
    printerId: user?.id ?? "",
  });
  const starred = starredQuery.data;
  const requested = requestedQuery.data;
  const [loading, setLoading] = useState(false);
  const [starClicked, setStarClicked] = useState(false);
  const [starState, setStarState] = useState<boolean>();

  useEffect(() => setStarState(!!starred), [starred]);

  return (
    <Layout needsAuth title={user?.name ?? ""} className="items-start">
      <div className="mx-2 flex flex-col items-start  px-6 pt-2 pb-4">
        <div className="flex w-full">
          <h1 className="w-full text-left">{user?.name}</h1>
          {!sessionData?.user?.printerProfile && (
            <div className="flex flex-col items-center justify-center">
              <Button
                name="star printer"
                className="bg-transparent"
                onClick={() => {
                  if (starred) {
                    setStarState(false);
                    unStarMut.mutate({ printerId: user?.id ?? "" });
                    setStarClicked(false);
                  } else {
                    setStarState(true);
                    setStarClicked(true);
                    starMut.mutate({ printerId: user?.id ?? "" });
                  }
                }}
              >
                {starState ? <BsStarFill /> : <BsStar />}
              </Button>
              {starClicked && (
                <ConfettiExplosion
                  force={0.6}
                  duration={3200}
                  particleCount={30}
                  width={400}
                />
              )}
            </div>
          )}
        </div>
        {user?.lastActive && (
          <p className="-pl-2 text-sm text-text-200">{lastActive}</p>
        )}

        <ResponseInfoSection {...user} />
      </div>
      {user?.printerProfile && (
        <div className="mx-8 px-6 pb-2">
          <PrinterInfoSection profile={user?.printerProfile} />
        </div>
      )}
      {!sessionData?.user.printerProfile && !requested && (
        <Button
          loading={
            loading ||
            status === "loading" ||
            requestedQuery.status === "loading"
          }
          onClick={() => {
            setLoading(true);
            messageMut.mutateAsync({ recipientId: user?.id ?? "" });
          }}
          name="Send Message Request"
        >
          Send Message Request
        </Button>
      )}
      {!sessionData?.user.printerProfile && requested && (
        <p className="flex items-center gap-1">
          <BiCheckCircle /> Message request sent
        </p>
      )}
    </Layout>
  );
};

export default ProfilePage;
