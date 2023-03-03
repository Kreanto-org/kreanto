import { useSession } from "next-auth/react";
import PrinterInfoSection from "~/components/page-specific/profile/printer-info-section";
import ResponseInfoSection from "~/components/page-specific/profile/response-info-section";
import Layout from "~/components/shared/layout";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const Profile: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <Layout title="My Profile" className="items-start">
      <div className="mx-4 flex flex-col items-start gap-1  px-6 pt-2 pb-4">
        <div className="flex w-full items-center gap-4">
          <Avatar>
            <AvatarImage
              src={sessionData?.user?.image ?? undefined}
              alt="user-pfp"
            />
            <AvatarFallback>
              {sessionData?.user?.name
                ?.split(" ")
                .map((name) => name[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h1 className="w-full text-left ">{sessionData?.user?.name}</h1>
        </div>

        <ResponseInfoSection {...sessionData?.user} />
      </div>
      {sessionData?.user?.printerProfile && (
        <div className="mx-4 px-6 py-4">
          <PrinterInfoSection profile={sessionData.user.printerProfile} />
        </div>
      )}
    </Layout>
  );
};

export default Profile;
