import type { Message as PrismaMessage } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "~/components/shared/layout";
import Button from "~/components/ui/button";
import { api } from "~/utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import Message from "~/components/page-specific/messages/message";

const MessageChat: React.FC = () => {
  const router = useRouter();
  const { status, data: sessionData } = useSession();
  const id = router.query.id?.toString() ?? "";
  const canAccessQuery = api.chat.canAccess.useQuery({ id: id });
  const canAccess = canAccessQuery.data;

  const sendMut = api.message.send.useMutation();

  // ----------------------

  const { data, fetchNextPage, hasNextPage } =
    api.message.infiniteQuery.useInfiniteQuery(
      {
        limit: 30,
        chatId: id,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const paginatedData: PrismaMessage[] = [];
  data?.pages?.forEach((page) => {
    page.items?.forEach((char) => {
      paginatedData.push(char);
    });
  });

  // ----------
  const [message, setMessage] = useState("");

  if (!canAccess && status !== "loading" && canAccessQuery.status !== "loading")
    return (
      <Layout>
        <h1>Not available</h1>
        <p>Check the link and make sure you have access to this chat!</p>
      </Layout>
    );

  return (
    <Layout needsAuth>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button
        onClick={async () => {
          await sendMut.mutateAsync({ text: message, chatId: id });
          setMessage("");
        }}
      >
        Send
      </Button>
      <div
        id="scrollableDiv"
        className="flex h-[300px] w-full flex-col-reverse overflow-auto"
      >
        <InfiniteScroll
          dataLength={paginatedData.length}
          next={fetchNextPage}
          style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
          inverse={true} //
          hasMore={hasNextPage ?? true}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {paginatedData?.map((m, i) => {
            const first =
              i === paginatedData.length - 1 ||
              paginatedData[i + 1]?.userId !== m.userId;
            const last = i === 0 || paginatedData[i - 1]?.userId !== m.userId;

            return (
              <Message
                key={i}
                isSelf={m.userId === sessionData?.user.id}
                first={first}
                last={last}
              >
                {m.text}
              </Message>
            );
          })}
        </InfiniteScroll>
      </div>
    </Layout>
  );
};

export default MessageChat;
