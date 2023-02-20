import Image from "next/image";
import Layout from "~/components/layout";

const Error404: React.FC = () => {
  return (
    <Layout title="404">
      <h1>
        4<span className="text-highlight">0</span>4
      </h1>
      <p>The page you are looking for does not exist!</p>
      <p>Check that your url is correct.</p>
    </Layout>
  );
};

export default Error404;
