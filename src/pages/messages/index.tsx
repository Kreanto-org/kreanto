import { useSession } from "next-auth/react";
import ChatLink from "~/components/page-specific/messages/chat-link";
import RequestCard from "~/components/page-specific/messages/request-card";
import Layout from "~/components/shared/layout";
import { api } from "~/utils/api";

const Messages: React.FC = () => {
  const { data: sessionData } = useSession();

  const messageRequestsQuery = api.chat.findRequests.useQuery({
    printerId: sessionData?.user.id ?? "",
  });
  const chatQuery = api.chat.findChats.useQuery();

  const messageRequests = messageRequestsQuery.data;
  const chats = chatQuery.data;

  return (
    <Layout needsAuth>
      {sessionData?.user.printerProfile &&
      messageRequests?.length &&
      messageRequests?.length > 0 ? (
        <div className="flex flex-col">
          <h4>Requests</h4>
          {messageRequests.map((req, i) => (
            <RequestCard req={req} key={i} />
          ))}
        </div>
      ) : (
        sessionData?.user.printerProfile && <h4>No Requests</h4>
      )}

      {chats?.length && chats?.length > 0 ? (
        <div className="flex flex-col">
          <h4>Chats</h4>
          {chats.map((chat, i) => (
            <ChatLink chat={chat} key={i} />
          ))}
        </div>
      ) : (
        sessionData?.user.printerProfile && <h4>No Chats</h4>
      )}
    </Layout>
  );
};

export default Messages;
