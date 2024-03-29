import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { colorRouter } from "./routers/colors";
import { chatRouter } from "./routers/chat";
import { messageRouter } from "./routers/message";
import { requestRouter } from "./routers/request";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  colors: colorRouter,
  chat: chatRouter,
  message: messageRouter,
  request: requestRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
