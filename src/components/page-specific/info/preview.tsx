import Link from "next/link";
import { DynamicIcon } from "~/server/cms";

const Preview: React.FC<{ title: string; slug: string; icon: string }> = ({
  title,
  slug,
  icon,
}) => {
  return (
    <Link href={`/info/${slug}`}>
      <div className="group flex h-96 w-full flex-col items-center rounded-3xl bg-bg-200/60 hover:bg-bg-200/80 active:bg-bg-200">
        <DynamicIcon
          name={icon}
          className="flex-1 transition-colors duration-150 group-hover:text-highlight"
          size="8rem"
        />
        <h1 className="m-3 mt-6 mb-8 text-center text-4xl uppercase">
          {title}
        </h1>
      </div>
    </Link>
  );
};

export default Preview;
