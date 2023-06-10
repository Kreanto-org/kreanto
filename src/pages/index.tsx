import { type NextPage } from "next";
import HexagonOutline from "~/components/page-specific/home/hexagon-outline";
import Layout from "~/components/shared/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-start">
        <h1 className="mt-10 tracking-tight text-white sm:text-[7rem]">
          KREANTO
        </h1>
        <p className="ml-2 -mt-4 w-fit text-left text-text-200">
          noun, Creator
        </p>
        <p className="ml-16 mt-2 w-fit text-left">
          A person or thing that brings something into existence.
        </p>
      </div>
      <div className="relative w-full">
        <HexagonOutline className="absolute left-0" />
        <h1 className="mt-20 text-[3.5rem]">From imagination to reality.</h1>
      </div>
    </Layout>
  );
};

export default Home;
