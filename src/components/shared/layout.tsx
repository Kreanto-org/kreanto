import { Header } from "~/components/shared/header";
import Navbar from "./navbar";
import Footer from "./footer";
import { cn } from "~/utils/cn";
import { useSession } from "next-auth/react";

const Layout: React.FC<
  React.PropsWithChildren<{
    title?: string;
    unAuthMessage?: string;
    needsAuth?: boolean;
    className?: string;
  }>
> = ({ title, unAuthMessage, needsAuth = false, className, children }) => {
  const { status } = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center bg-bg-main text-text-100">
      <Header title={title} />
      <Navbar />
      <div
        className={cn(
          "flex h-full w-full flex-1 flex-col items-center justify-center",
          className
        )}
      >
        {!needsAuth || status === "authenticated" ? (
          <>{children}</>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <h1>First, sign in!</h1>
            <p>{unAuthMessage ?? ""}</p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
