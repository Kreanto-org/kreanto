import { useRouter } from "next/router";
import { PortableTextLayout } from "~/components/page-specific/info/portable-text";
import Layout from "~/components/shared/layout";
import { type InfoPageType, cms, DynamicIcon } from "~/server/cms";

import { HiOutlineArrowUturnLeft } from "react-icons/hi2";

const InfoPage: React.FC<{ pages: InfoPageType[] }> = ({ pages }) => {
  const router = useRouter();
  const slug = router.query.slug?.toString() ?? "";
  const page = pages.filter((page) => page.slug === slug)[0];

  return (
    <Layout className="items-start justify-start p-6">
      <a
        href="/info"
        className="flex items-center gap-2 border-b-[1px] border-transparent text-text-100/70 transition-all hover:border-text-100/70"
      >
        <HiOutlineArrowUturnLeft />
        Information
      </a>
      <DynamicIcon
        name={page?.icon}
        size="5.5rem"
        className="my-4 ml-6 text-highlight"
      />
      <h1 className="w-full break-words text-left text-3xl md:text-[4rem]">
        {page?.title}
      </h1>

      <div className="mt-3 max-w-[90vw] break-words md:mt-0 md:ml-2 md:max-w-[40rem]">
        <PortableTextLayout text={page?.body ?? []} />
      </div>
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
  console.log(pages);

  const paths = pages.map((page) => ({
    params: { slug: page.slug },
  }));

  return { paths, fallback: false };
}
