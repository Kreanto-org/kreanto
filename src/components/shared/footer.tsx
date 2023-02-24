import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <div className="mt-[5rem] flex h-[10rem] w-screen items-center justify-between bg-bg-200 px-20 shadow">
      <div className="flex gap-4">
        <Image src="/logo.svg" alt="" width={45} height={45} />
        <div className="flex h-full flex-col justify-between">
          <h3 className="tracking-tight text-text-100">
            Design <span className="text-highlight">Bridge</span>
          </h3>
          <p className="text-text-200">
            Bridging the gap, one design at a time.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between align-bottom">
        <p className="text-text-100">
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
