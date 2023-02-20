import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Layout from "~/components/shared/layout";

const Home: NextPage = () => {
  const { data } = useSession();
  console.log(data?.user.age);

  return (
    <Layout>
      <h1 className="mt-10 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Design <span className="text-highlight">Bridge</span>
      </h1>
      <p className="mt-4 text-text-200">
        Bridging the gap, one Design at a time.
      </p>
    </Layout>
  );
};

export default Home;
