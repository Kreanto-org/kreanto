import { type NextPage } from "next";
import Layout from "~/components/shared/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className="mt-10 tracking-tight text-white sm:text-[5rem]">
        KREANTO
      </h1>
      <p className="mt-4 text-text-200">A new place for creators.</p>
    </Layout>
  );
};

export default Home;
