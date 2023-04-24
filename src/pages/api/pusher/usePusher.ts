import { env } from "~/env.mjs";
import { useRouter } from "next/router";
import PusherJS from "pusher-js";
import { useEffect, useRef } from "react";
import { api } from "~/utils/api";

export const usePusher = async (id: string) => {
  const pusher = useRef<PusherJS>();
  const ctx = api.useContext();
  const router = useRouter();

  useEffect(() => {
    // Connect to pusher
    if (!pusher.current) {
      pusher.current = new PusherJS(env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
        userAuthentication: {
          endpoint: "/api/pusher/auth",
          transport: "ajax",
        },
      });

      pusher.current.unsubscribe(id);
      pusher.current.unbind_all();
      pusher.current.subscribe(id);

      pusher.current.bind("message-send", async () => {
        await ctx.message.invalidate();
        document.dispatchEvent(new Event("visibilitychange"));
      });
    }

    return () => {
      if (pusher.current) {
        pusher.current.disconnect();
        pusher.current = undefined;
      }
    };
  }, [ctx, router, id]);
};
