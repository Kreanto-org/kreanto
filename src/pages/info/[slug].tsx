import { useRouter } from "next/router";
import { PortableTextLayout } from "~/components/page-specific/info/portable-text";
import Layout from "~/components/shared/layout";
import { type InfoPageType, cms, DynamicIcon } from "~/server/cms";

import { HiOutlineArrowUturnLeft } from "react-icons/hi2";
import useWindowSize from "~/utils/useWindowSize";
import Link from "next/link";

const InfoPage: React.FC<{ pages: InfoPageType[] }> = ({ pages }) => {
  const router = useRouter();
  const slug = router.query.slug?.toString() ?? "";
  const page = pages.filter((page) => page.slug === slug)[0];
  const { isMobile } = useWindowSize();

  return (
    <Layout className="flex-row items-start p-6 pt-12">
      <div className="flex h-full w-full flex-[4] flex-col items-start justify-start">
        <DynamicIcon
          name={page?.icon}
          size="5.5rem"
          className="mb-4 ml-6 text-highlight"
        />
        <h1 className="w-full break-words text-left text-3xl md:my-5 md:text-[4.75rem]">
          {page?.title}
        </h1>

        <div className="mt-3 max-w-[90vw] break-words font-normal md:mt-6 md:ml-2 md:max-w-[60rem]">
          <PortableTextLayout text={page?.body ?? []} />
        </div>
      </div>
      {!isMobile && (
        <div className="flex h-full w-full flex-1 flex-col items-end justify-start p-4 pr-10">
          <Link
            href="/info"
            className="flex items-center gap-2 border-b-[1px] border-transparent text-text-100/70 transition-all hover:border-text-100/70"
            aria-label="Information"
          >
            <HiOutlineArrowUturnLeft />
            Information
          </Link>
          <hr className="my-2  w-full border-text-100/20" />
          {pages
            .filter((page) => page.slug !== slug)
            .map((page, i) => (
              <Link
                href={`/info/${page.slug}`}
                key={i}
                className="mb-2 border-b-[1px] border-transparent text-text-100/70 transition-all hover:border-text-100/70"
                aria-label={page.title + " information page"}
              >
                {page.title}
              </Link>
            ))}
        </div>
      )}
    </Layout>
  );
};

export default InfoPage;

export async function getStaticProps() {
  const pages: InfoPageType[] = await cms.fetch(
    `*[_type == "post"]{title, 'slug': slug.current, body, 'icon': icon.name}`
  );

  return {
    props: {
      pages,
    },
  };
}

export async function getStaticPaths() {
  const pages: InfoPageType[] = await cms.fetch(
    `*[_type == "post"]{title, 'slug': slug.current, body}`
  );

  const paths = pages.map((page) => ({
    params: { slug: page.slug },
  }));

  return { paths, fallback: false };
}
