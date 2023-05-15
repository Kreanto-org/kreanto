import type { Message as PrismaMessage } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "~/components/shared/layout";
import Button from "~/components/ui/button";
import { api } from "~/utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import Message from "~/components/page-specific/messages/message";
import useWindowSize from "~/utils/useWindowSize";
import { MdSend } from "react-icons/md";
import { usePusher } from "../api/pusher/usePusher";
import { HiDocumentArrowUp } from "react-icons/hi2";

const MessageChat: React.FC = () => {
  const router = useRouter();
  const { status, data: sessionData } = useSession();
  const id = router.query.id?.toString() ?? "";
  const canAccessQuery = api.chat.canAccess.useQuery({ id: id });
  const canAccess = canAccessQuery.data;
  const { isMobile } = useWindowSize();
  const [disabled, setDisabled] = useState(false);

  const sendMut = api.message.send.useMutation();
  usePusher(id);

  // ----------------------

  const { data, fetchNextPage, hasNextPage, isLoading } =
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

  const sendMessage = async () => {
    if (disabled || !message.trim()) return;
    setDisabled(true);
    await sendMut.mutateAsync({ text: message, chatId: id });
    setMessage("");
    setDisabled(false);
  };

  const otherPersonInChatQuery = api.chat.getOtherUserInChat.useQuery({
    id,
  });
  const otherPersonInChat = otherPersonInChatQuery.data;

  return (
    <Layout needsAuth noFooter loading={isLoading}>
      <div
        id="scrollableDiv"
        className="flex h-[75vh] w-full flex-col-reverse overflow-auto"
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
              <Message key={i} message={m} first={first} last={last}>
                {m.text}
              </Message>
            );
          })}
          <p className="text-text-200">
            Messaging with{" "}
            <span className="text-text-100/90">{otherPersonInChat?.name}</span>
          </p>
        </InfiniteScroll>
      </div>
      <div className="mt-6 flex w-full items-center gap-2 px-4">
        {!sessionData?.user.printerProfile && (
          <Button
            onClick={() => console.log("hi")}
            disabled={disabled}
            className="h-full bg-highlight py-3 text-white md:bg-bg-200 md:text-highlight"
            name="Request a print"
          >
            <HiDocumentArrowUp />
          </Button>
        )}

        <input
          className="flex-1 rounded-lg bg-bg-200 py-2 pl-4 text-white outline-none md:px-4"
          placeholder={isMobile ? "Enter" : "Enter your message..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={async (e) => e.key === "Enter" && (await sendMessage())}
        />
        <Button
          onClick={sendMessage}
          disabled={disabled}
          className="h-full bg-highlight py-2 text-white md:bg-bg-200 md:text-highlight"
          name="Send"
        >
          {isMobile ? <MdSend size="1.2rem" /> : <span>Send</span>}
        </Button>
      </div>
    </Layout>
  );
};

export default MessageChat;
