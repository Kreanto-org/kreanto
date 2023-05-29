import useWindowSize from "~/utils/useWindowSize";
import Logo from "./logo";
import Link from "next/link";
import { BsDiscord, BsGithub, BsInstagram } from "react-icons/bs";
import { useState } from "react";
import { IconType } from "react-icons";
import { cn } from "~/utils/cn";

const Footer: React.FC = () => {
  const [hoverLbl, setHoverLbl] = useState("");
  const { isMobile } = useWindowSize();
  return (
    <div className="mt-4 flex h-44 w-screen flex-col items-center justify-center gap-3 bg-bg-200 px-10 shadow md:h-32 md:flex-row md:justify-between">
      <div className="flex items-center gap-2 md:gap-4">
        <Logo size={isMobile ? "2rem" : "4.5rem"} />
        <div className="flex h-full flex-col justify-between">
          <h1 className="text-[2rem] tracking-tight text-text-100">KREANTO</h1>
          {!isMobile && (
            <p className="text-text-200">
              Enabling creators, empowering makers.
            </p>
          )}
        </div>
      </div>

      {/* <div className="flex flex-col justify-between align-bottom">
        <p className="text-text-200">
          Created with love by{" "}
          <Link
            href="https://santiagovira.tech"
            target="_blank"
            rel="noreferrer"
            className="text-highlight underline"
            aria-label="Creator link"
          >
            Santiago Vira
          </Link>
        </p>
      </div> */}
      <div className="align-center flex justify-between gap-4">
        <SocialIcon
          label="Instagram"
          link="https://www.instagram.com/kreanto_org/"
          hoverLbl={hoverLbl}
          setHoverLbl={setHoverLbl}
          Icon={BsInstagram}
        />
        <SocialIcon
          label="Github"
          link="https://github.com/kreanto-org/kreanto"
          hoverLbl={hoverLbl}
          setHoverLbl={setHoverLbl}
          Icon={BsGithub}
        />
        <SocialIcon
          label="Discord"
          link="https://discord.gg/hJVysPaaDb"
          hoverLbl={hoverLbl}
          setHoverLbl={setHoverLbl}
          Icon={BsDiscord}
        />
      </div>
    </div>
  );
};

export default Footer;

const SocialIcon: React.FC<{
  label: string;
  link: string;
  hoverLbl: string;
  setHoverLbl: React.Dispatch<React.SetStateAction<string>>;
  Icon: IconType;
}> = ({ label, link, hoverLbl, setHoverLbl, Icon }) => (
  <Link
    href={link}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    onMouseEnter={() => setHoverLbl(label)}
    onMouseLeave={() => setHoverLbl("")}
  >
    <Icon
      size="2rem"
      // color={hoverLbl === label ? "#ffffff" : "rgb(255,255,255,"}
      className={cn(
        "text-white opacity-20 transition-all",
        (hoverLbl === label || hoverLbl === "") && "opacity-100"
      )}
    />
  </Link>
);
