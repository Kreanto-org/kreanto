import { Header } from "~/components/shared/header";
import Navbar from "./navbar";
import Footer from "./footer";
import { cn } from "~/utils/cn";
import { useSession } from "next-auth/react";
import useWindowSize from "~/utils/useWindowSize";
import MobileNavbar from "./mobile-navbar";
import Image from "next/image";

const Layout: React.FC<
  React.PropsWithChildren<{
    title?: string;
    unAuthMessage?: string;
    needsAuth?: boolean;
    className?: string;
    noFooter?: boolean;
  }>
> = ({
  title,
  unAuthMessage,
  needsAuth = false,
  className,
  noFooter = false,
  children,
}) => {
  const { status } = useSession();
  const { isMobile } = useWindowSize();
  return (
    <main className="flex min-h-screen flex-col items-center bg-bg-main text-text-100">
      <Header title={title} />
      {isMobile ? <MobileNavbar /> : <Navbar />}
      <div
        className={cn(
          "flex h-full w-full flex-1 flex-col items-center justify-center",
          className
        )}
      >
        {status === "loading" ? (
          <Image src="/Loading.gif" width={100} height={100} alt="loading..." />
        ) : !needsAuth || status === "authenticated" ? (
          <>{children}</>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <h1>First, sign in!</h1>
            <p>{unAuthMessage ?? ""}</p>
          </div>
        )}
      </div>
      {!noFooter && <Footer />}
    </main>
  );
};

export default Layout;
