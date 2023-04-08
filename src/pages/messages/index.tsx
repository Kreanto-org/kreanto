import { useSession } from "next-auth/react";
import RequestCard from "~/components/page-specific/messages/request-card";
import Layout from "~/components/shared/layout";
import { api } from "~/utils/api";

const Messages: React.FC = () => {
  const { data: sessionData } = useSession();
  const messageRequestsQuery = api.chat.findRequests.useQuery({
    printerId: sessionData?.user.id ?? "",
  });
  const messageRequests = messageRequestsQuery.data;
  return (
    <Layout needsAuth>
      {sessionData?.user.printerProfile && messageRequests && (
        <div className="flex flex-col">
          <h4>Requests</h4>
          {messageRequests.map((req, i) => (
            <RequestCard req={req} key={i} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Messages;
