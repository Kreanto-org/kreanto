import { useRouter } from "next/router";
import { PortableTextLayout } from "~/components/page-specific/info/portable-text";
import Layout from "~/components/shared/layout";
import { type InfoPageType, cms } from "~/server/cms";
import * as Icons from "react-icons/fa";
import type { IconType } from "react-icons";
import { HiOutlineArrowUturnLeft } from "react-icons/hi2";

const DynamicFontAwesomeIcon: (name: string | undefined) => IconType = (
  name
) => {
  if (name && Object.keys(Icons).includes(name)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Icons[name];
  }
};

const InfoPage: React.FC<{ pages: InfoPageType[] }> = ({ pages }) => {
  const router = useRouter();
  const slug = router.query.slug?.toString() ?? "";
  const page = pages.filter((page) => page.slug === slug)[0];
  const Icon = DynamicFontAwesomeIcon(page?.icon);

  console.log(page?.body);

  return (
    <Layout className="items-start justify-start p-6">
      <a
        href="/info"
        className="flex items-center gap-2 border-b-[1px] border-transparent text-text-100/70 transition-all hover:border-text-100/70"
      >
        <HiOutlineArrowUturnLeft />
        Information
      </a>
      <Icon size="5.5rem" className="my-4 ml-6 text-highlight" />
      <h1 className="w-full text-left text-[4rem] uppercase">{page?.title}</h1>

      <div className="ml-2 max-w-[40rem]">
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
