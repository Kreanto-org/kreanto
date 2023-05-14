import Link from "next/link";
import { DynamicIcon } from "~/server/cms";

const Preview: React.FC<{ title: string; slug: string; icon: string }> = ({
  title,
  slug,
  icon,
}) => {
  return (
    <Link href={`/info/${slug}`} aria-label={title + " Info page"}>
      <div className="group flex h-72 w-full flex-col items-center rounded-3xl bg-bg-200/60 transition-all hover:scale-105 hover:bg-bg-200/80 active:bg-bg-200">
        <DynamicIcon
          name={icon}
          className="flex-1 transition-colors duration-150 group-hover:text-highlight"
          size="6rem"
        />
        <h3 className="m-3 mt-6 mb-8 text-center text-3xl">{title}</h3>
      </div>
    </Link>
  );
};

export default Preview;
