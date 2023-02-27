import Head from "next/head";

export const Header: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <Head>
      <title>{`${title ? title + " | " : ""}Kreanto`}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        property="og:title"
        content={`${title ? title + " | " : ""}Kreanto`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://santiagovira.tech" />
      <meta property="og:description" content="A new place for creators." />
    </Head>
  );
};
