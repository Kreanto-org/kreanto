import { type NextPage } from "next";
import Dots from "~/components/page-specific/home/dots";
import HexagonOutline from "~/components/page-specific/home/hexagon-outline";
import Objects from "~/components/page-specific/home/objects";
import Layout from "~/components/shared/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex h-[75vh] flex-col items-start justify-center">
        <h1 className="mt-10 text-center tracking-tight text-white sm:text-[7rem]">
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
        <h1 className="mt-44 ml-36 max-w-[50vw] text-[5rem]">
          From imagination to reality.
        </h1>
        <p className="ml-36 mt-2 w-fit max-w-[50vw] text-left text-text-200">
          Kreanto connects the creativity of young minds to the technology that
          can make their dreams real.
        </p>
      </div>
      <div className="relative flex w-full  items-center justify-between">
        <Dots className="w-0" />
        <Objects />
        <div className="relative items-start justify-end">
          <Dots className="absolute -right-36" />
          <h1 className="mt-44 mr-36 max-w-[50vw] text-right text-[5rem]">
            Inspiring the <span className="underline">next generation</span> of
            engineers
          </h1>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
