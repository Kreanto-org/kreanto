import { useSession } from "next-auth/react";

interface ITab {
  name: string;
  href: string;
}

export const useTabs: () => ITab[] = () => {
  const { status } = useSession();

  return status === "authenticated"
    ? [
        { name: "My Profile", href: "/profile" },
        { name: "Messages", href: "/messages" },
        { name: "Info", href: "/info" },
        { name: "Printers", href: "/printers" },
      ]
    : [{ name: "Info", href: "/info" }];
};
