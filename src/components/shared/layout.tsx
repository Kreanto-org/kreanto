import { Header } from "~/components/shared/header";
import Navbar from "./navbar";
import Footer from "./footer";
import { cn } from "~/utils/cn";
import { useSession } from "next-auth/react";
import useWindowSize from "~/utils/useWindowSize";
import MobileNavbar from "./mobile-navbar";
import Loading from "./loading";
import { useRef } from "react";
import { api } from "~/utils/api";

const Layout: React.FC<
  React.PropsWithChildren<{
    title?: string;
    unAuthMessage?: string;
    needsAuth?: boolean;
    className?: string;
    noFooter?: boolean;
    loading?: boolean;
  }>
> = ({
  title,
  unAuthMessage,
  needsAuth = false,
  className,
  noFooter = false,
  loading = false,
  children,
}) => {
  const { status } = useSession();
  const { isMobile } = useWindowSize();
  const isLoading = loading || status === "loading";

  const setLastActive = api.user.lastActive.useMutation();
  const sent = useRef(false);

  if (!sent.current) {
    setLastActive.mutate();
    sent.current = true;
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-bg-main text-text-100">
      <Header title={title} />
      <div className="absolute top-0">
        {isMobile ? <MobileNavbar /> : <Navbar />}
      </div>

      <div
        className={cn(
          "mt-10 flex h-full w-full flex-1 flex-col items-center justify-center overflow-x-hidden overflow-y-clip pb-20",
          className
        )}
      >
        {isLoading ? (
          <Loading />
        ) : !needsAuth || status === "authenticated" ? (
          <>{children}</>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <h1>First, sign in!</h1>
            <p>{unAuthMessage ?? ""}</p>
          </div>
        )}
      </div>
      {!noFooter && !isLoading && <Footer />}
    </main>
  );
};

export default Layout;
