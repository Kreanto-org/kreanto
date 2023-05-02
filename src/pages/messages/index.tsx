import { useSession } from "next-auth/react";
import ChatLink from "~/components/page-specific/messages/chat-link";
import RequestCard from "~/components/page-specific/messages/request-card";
import Layout from "~/components/shared/layout";
import { api } from "~/utils/api";
import useWindowSize from "~/utils/useWindowSize";

const Messages: React.FC = () => {
  const { data: sessionData } = useSession();
  const { isMobile } = useWindowSize();

  const messageRequestsQuery = api.chat.findRequests.useQuery({
    printerId: sessionData?.user.id ?? "",
  });
  const chatQuery = api.chat.findChats.useQuery();

  const messageRequests = messageRequestsQuery.data;
  const chats = chatQuery.data;

  return (
    <Layout needsAuth className="flex-row items-start p-10 pt-12">
      <div className="flex h-full w-full flex-[4] flex-col items-start justify-start">
        <h1>Your Messages</h1>

        {sessionData?.user.printerProfile &&
        messageRequests?.length &&
        messageRequests?.length > 0 ? (
          <div className="flex flex-col">
            {messageRequests.map((req, i) => (
              <RequestCard req={req} key={i} />
            ))}
          </div>
        ) : (
          sessionData?.user.printerProfile && <h4>No Chats</h4>
        )}

        {chats?.length && messageRequests?.length ? (
          <hr className="my-2  w-96 border-text-100/20" />
        ) : (
          <></>
        )}

        {chats?.length && chats?.length > 0 ? (
          <div className="flex flex-col">
            {chats.map((chat, i) => (
              <ChatLink chat={chat} key={i} />
            ))}
          </div>
        ) : (
          sessionData?.user.printerProfile && <h4>No Chats</h4>
        )}
      </div>
      {!isMobile && sessionData?.user.printerProfile && (
        <div className="flex h-full w-full flex-1 flex-col items-end justify-start p-4 pr-10">
          <h4>Requests</h4>
          <hr className="my-2  w-full border-text-100/20" />
          {messageRequests?.length && messageRequests?.length > 0 ? (
            <div className="flex flex-col">
              <h4>Requests</h4>
              {messageRequests.map((req, i) => (
                <RequestCard req={req} key={i} />
              ))}
            </div>
          ) : (
            sessionData?.user.printerProfile && <h4>No Requests</h4>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Messages;
