import Head from "next/head";

export const Header: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <Head>
      <title>{`${title ? title + " | " : ""}Design Bridge`}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        property="og:title"
        content={`${title ? title + " | " : ""}Design Bridge`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://santiagovira.tech" />
      <meta
        property="og:description"
        content="Bridging the gap, one design at a time."
      />
    </Head>
  );
};
