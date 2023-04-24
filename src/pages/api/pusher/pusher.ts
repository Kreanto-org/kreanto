import { useRouter } from "next/router";
import Pusher from "pusher-js";
import { useEffect, useRef } from "react";
import { env } from "~/env.mjs";
import { api } from "~/utils/api";

export const usePusher = async (id: string) => {
  const pusher = useRef<Pusher>();
  const ctx = api.useContext();
  const router = useRouter();

  useEffect(() => {
    // Connect to pusher
    console.log(pusher.current, "---------");
    if (!pusher.current) {
      pusher.current = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
        userAuthentication: {
          endpoint: "/api/pusher/auth",
          transport: "ajax",
        },
      });
      console.log(pusher.current);

      pusher.current.unsubscribe(id);
      pusher.current.unbind_all();
      pusher.current.subscribe(id);
      pusher.current.bind("invalidate", async (d: { raw: string }) => {
        console.log("\n\nRecieved invalidate message\n\n");
        await ctx.message.invalidate();
        // await ctx.room.invalidate();
        // const data: {
        //   userId: string;
        //   redeemedAt: number;
        //   user: User;
        //   path?: string;
        // } = SuperJSON.parse(d.raw);
        // if (data.path) {
        //   await router.push(data.path);
        // }

        document.dispatchEvent(new Event("visibilitychange"));
      });
    }

    return () => {
      if (pusher.current) {
        pusher.current.disconnect();
        pusher.current = undefined;
      }
    };
  }, [ctx, router]);
};
