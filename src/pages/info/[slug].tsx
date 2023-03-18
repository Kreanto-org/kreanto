import { useRouter } from "next/router";
import { PortableTextLayout } from "~/components/page-specific/info/portable-text";
import Layout from "~/components/shared/layout";
import { type InfoPageType, cms } from "~/server/cms";

const InfoPage: React.FC<{ pages: InfoPageType[] }> = ({ pages }) => {
  const router = useRouter();
  const slug = router.query.slug?.toString() ?? "";
  const page = pages.filter((page) => page.slug === slug)[0];

  return (
    <Layout>
      <PortableTextLayout text={page?.body ?? []} />
    </Layout>
  );
};

export default InfoPage;

export async function getStaticProps() {
  const pages: InfoPageType[] = await cms.fetch(
    `*[_type == "post"]{title, 'slug': slug.current, body}`
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
