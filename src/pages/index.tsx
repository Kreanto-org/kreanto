import { Canvas } from "@react-three/fiber";
import { type NextPage } from "next";
import Box from "~/components/box";
import Layout from "~/components/shared/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className="mt-10 tracking-tight text-white sm:text-[5rem]">
        KREANTO
      </h1>
      <p className="mt-4 text-text-200">
        Enabling creators, empowering makers.
      </p>
      <Canvas>
        <Box />
        <ambientLight intensity={0.1} />
        <directionalLight />
      </Canvas>
    </Layout>
  );
};

export default Home;
