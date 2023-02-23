import { type NextPage } from "next";
import Layout from "~/components/shared/layout";
import ChooseRole from "~/components/specific/sign-up/choose-role";

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className="mt-10 tracking-tight text-white sm:text-[5rem]">
        Design <span className="text-highlight">Bridge</span>
      </h1>
      <p className="mt-4 text-text-200">
        Bridging the gap, one design at a time.
      </p>
      <ChooseRole />
    </Layout>
  );
};

export default Home;
