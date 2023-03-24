import { signIn, signOut, useSession } from "next-auth/react";
import Tab from "./tab";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "./logo";
import { Fragment, useState } from "react";
import { cn } from "~/utils/cn";

export interface ITab {
  name: string;
  href: string;
}

const Navbar: React.FC = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  const mainTabs: ITab[] =
    status === "authenticated"
      ? [
          { name: "My Profile", href: "/profile" },
          { name: "Info", href: "/info" },
          { name: "Lorem", href: "/ipsum-dolor" },
        ]
      : [];

  const [homeHover, setHomeHover] = useState(false);

  return (
    <div className="flex h-14 w-screen items-center justify-between px-20 pb-1 pt-4">
      <div className="flex flex-1 items-center justify-start">
        <Link
          href="/"
          className={cn(
            "flex items-center justify-center rounded-full p-[0.3625rem] transition hover:-translate-y-0.5",
            router.pathname === "/" ? "bg-black/40" : "bg-black/20"
          )}
          onMouseEnter={() => setHomeHover(true)}
          onMouseLeave={() => setHomeHover(false)}
        >
          <Logo
            size="1.4rem"
            color={
              homeHover
                ? "rgb(255 255 255 / 0.8)"
                : router.pathname === "/"
                ? "white"
                : "#9f9fa2"
            }
          />
        </Link>
      </div>

      <div
        className={cn(
          "flex h-full items-center justify-center rounded-full px-4",
          mainTabs.length
            ? router.pathname === "/"
              ? "bg-black/20"
              : "bg-black/40"
            : "bg-transparent"
        )}
      >
        {mainTabs.map((tab, i) => (
          <Fragment key={i}>
            <Tab {...tab} />
            {i != mainTabs.length - 1 && (
              <div className="mx-3 h-2/3 w-0 border-l-[1px] border-text-300/40" />
            )}
          </Fragment>
        ))}
      </div>
      <div className="flex h-full flex-1 items-center justify-end">
        <button
          className="h-full rounded-full bg-black/20 px-[0.7rem] text-right text-text-200 no-underline transition hover:-translate-y-0.5 hover:bg-black/40 hover:text-highlight"
          onClick={
            sessionData
              ? () => void signOut()
              : () =>
                  void signIn("google", {
                    callbackUrl: `/sign-up?redirect=${encodeURIComponent(
                      router.asPath
                    )}`,
                  })
          }
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
