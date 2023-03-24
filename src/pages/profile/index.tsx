import { useSession } from "next-auth/react";
import PrinterInfoSection from "~/components/page-specific/profile/printer-info-section";
import ResponseInfoSection from "~/components/page-specific/profile/response-info-section";
import Layout from "~/components/shared/layout";

const Profile: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <Layout
      title={sessionData?.user.name ?? ""}
      unAuthMessage="Sign in to view your profile!"
      needsAuth
      className="items-start"
    >
      <div className="mx-2 flex flex-col items-start gap-1  px-6 pt-2 pb-4">
        <h1 className="w-full text-left">{sessionData?.user.name}</h1>

        <ResponseInfoSection {...sessionData?.user} />
      </div>
      {sessionData?.user.printerProfile && (
        <div className="mx-8 px-6 pb-2">
          <PrinterInfoSection profile={sessionData?.user.printerProfile} />
        </div>
      )}
    </Layout>
  );
};

export default Profile;
