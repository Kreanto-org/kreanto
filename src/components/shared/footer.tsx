import useWindowSize from "~/utils/useWindowSize";
import Logo from "./logo";

const Footer: React.FC = () => {
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

      <div className="flex flex-col justify-between align-bottom">
        <p className="text-text-200">
          Created with love by{" "}
          <a
            href="https://santiagovira.tech"
            target="_blank"
            rel="noreferrer"
            className="text-highlight underline"
          >
            Santiago Vira
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
