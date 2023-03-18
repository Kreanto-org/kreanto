import Link from "next/link";
import { useRouter } from "next/router";
import type { ITab } from "./navbar";

const Tab: React.FC<ITab> = ({ name, href }) => {
  const router = useRouter();
  const selected = router.pathname === href;

  return (
    <div className="flex h-full flex-col ">
      <div
        className={`${
          selected ? "text-text-100" : "text-text-200"
        } flex h-full flex-1 flex-col justify-center hover:text-text-100/80`}
      >
        <Link href={href}>
          <p className="text-[1rem] transition hover:-translate-y-[0.08rem]">
            {name}
          </p>
        </Link>
      </div>

      {/* {selected && <div className=" h-[2px] w-full rounded bg-text-100" />} */}
    </div>
  );
};

export default Tab;
