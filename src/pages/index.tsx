import { type NextPage } from "next";
import Layout from "~/components/shared/layout";
import Loading from "~/components/shared/loading";

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className="mt-10 tracking-tight text-white sm:text-[5rem]">
        KREANTO
      </h1>
      <p className="mt-4 text-text-200">
        Enabling creators, empowering makers.
      </p>
      <Loading />
    </Layout>
  );
};

export default Home;
