import { Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "~/components/shared/layout";
import Button from "~/components/ui/button";
import { api } from "~/utils/api";
import InfiniteScroll from "react-infinite-scroll-component";

const MessageChat: React.FC = () => {
  const router = useRouter();
  const { status } = useSession();
  const id = router.query.id?.toString() ?? "";
  const canAccessQuery = api.chat.canAccess.useQuery({ id: id });
  const canAccess = canAccessQuery.data;

  const sendMut = api.message.send.useMutation();
  const messagesQuery = api.message.infiniteQuery.useInfiniteQuery(
    { chatId: id, limit: 30 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      // initialCursor: 1, // <-- optional you can pass an initialCursor
    }
  );

  // ----------------------

  const { data, fetchNextPage } = api.message.infiniteQuery.useInfiniteQuery(
    {
      limit: 3,
      chatId: id,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const paginatedData: Message[] = [];
  data?.pages?.forEach((page) => {
    page.items?.forEach((char) => {
      // paginatedData.splice(0, 0, char);
      paginatedData.push(char);
    });
  });

  // ----------

  const messages = messagesQuery.data?.pages;
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
          hasMore={true}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {paginatedData?.map((m, i) => (
            <p key={i} onScroll={() => console.log("yo")} className="mt-24">
              {m.text}
            </p>
          ))}
        </InfiniteScroll>
      </div>
    </Layout>
  );
};

export default MessageChat;
