import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "~/components/shared/layout";
import Button from "~/components/ui/button";
import { api } from "~/utils/api";

const MessageChat: React.FC = () => {
  const router = useRouter();
  const { status } = useSession();
  const id = router.query.id?.toString() ?? "";
  const canAccessQuery = api.chat.canAccess.useQuery({ id: id });
  const canAccess = canAccessQuery.data;

  const sendMut = api.message.send.useMutation();
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
    </Layout>
  );
};

export default MessageChat;
