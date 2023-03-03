import { useRouter } from "next/router";
import PrinterInfoSection from "~/components/page-specific/profile/printer-info-section";
import ResponseInfoSection from "~/components/page-specific/profile/response-info-section";
import Layout from "~/components/shared/layout";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/utils/api";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const slug = router.query.slug?.toString() ?? "";
  const userQuery = api.user.findUnique.useQuery({ slug });
  const user = userQuery.data;

  return (
    <Layout title={user?.name ?? ""}>
      <div className="m-4 flex flex-col items-start gap-1 rounded-md bg-bg-200 px-6 pt-2 pb-4">
        <div className="flex w-full items-center gap-4">
          <Avatar>
            <AvatarImage src={user?.image ?? undefined} alt="user-pfp" />
            <AvatarFallback>
              {user?.name
                ?.split(" ")
                .map((name) => name[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h1 className="w-full text-left ">{user?.name}</h1>
        </div>

        <ResponseInfoSection {...user} />
      </div>
      {user?.printerProfile && (
        <div className="m-4 rounded-md bg-bg-200 px-6 py-4">
          <PrinterInfoSection profile={user.printerProfile} />
        </div>
      )}
    </Layout>
  );
};

export default ProfilePage;
