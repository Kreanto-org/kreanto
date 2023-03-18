import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Tab from "./tab";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "./logo";
import { useState } from "react";
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
      ? [{ name: "My Profile", href: "/profile" }]
      : [];

  const [homeHover, setHomeHover] = useState(false);

  return (
    <div className="flex w-screen items-center justify-between py-4 px-20">
      <div className="flex flex-1 items-center justify-start">
        <Link
          href="/"
          className={cn(
            "flex h-[34px] w-[34px] items-center justify-center rounded-full",
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

      {mainTabs.map((tab, i) => (
        <Tab key={i} {...tab} />
      ))}
      <div className="flex flex-1 items-center justify-end">
        <button
          className="h-[34px] rounded-full bg-black/20 px-[0.7rem] text-right text-text-200 no-underline transition hover:-translate-y-0.5 hover:text-highlight"
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
