import Preview from "~/components/page-specific/info/preview";
import Layout from "~/components/shared/layout";
import { type InfoPageType, cms } from "~/server/cms";

const Index: React.FC<{ pages: InfoPageType[] }> = ({ pages }) => {
  return (
    <Layout title="Learn">
      <div className="grid w-full max-w-[80rem] flex-1 grid-cols-1 gap-8 p-4 sm:grid-cols-2 md:grid-cols-3 md:p-12 lg:grid-cols-4">
        {pages.map((p, i) => (
          <Preview title={p.title} icon={p.icon} slug={p.slug} key={i} />
        ))}
      </div>
    </Layout>
  );
};

export default Index;

export async function getStaticProps() {
  // const pages: InfoPageType[] = await cms.fetch(
  //   `*[_type == "post"]{title, 'icon': icon.name, 'slug': slug.current}`
  // );

  const pages: InfoPageType[] = [];

  return {
    props: {
      pages,
    },
  };
}
