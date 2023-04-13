import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "~/components/shared/layout";
import { api } from "~/utils/api";

const MessageChat: React.FC = () => {
  const router = useRouter();
  const { status } = useSession();
  const id = router.query.id?.toString() ?? "";
  const canAccessQuery = api.chat.canAccess.useQuery({ id: id });
  const canAccess = canAccessQuery.data;

  if (!canAccess && status !== "loading" && canAccessQuery.status !== "loading")
    return (
      <Layout>
        <h1>Not available</h1>
        <p>Check the link and make sure you have access to this chat!</p>
      </Layout>
    );

  return <Layout needsAuth></Layout>;
};

export default MessageChat;
