import Head from "next/head";

export const Header: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <Head>
      <title>{`${title ? title + " | " : ""}Kreanto`}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta charSet="UTF-8" />
      <meta
        name="keywords"
        content="3d printing, 3d print, design, 3d model, designer, maker, creator, create, kreanto"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta
        property="og:title"
        content={`${title ? title + " | " : ""}Kreanto`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://kreanto.vercel.app" />
      <meta
        property="og:description"
        content="Kreanto connects those without access to 3D printing to people who do, bridging the gap in STEAM one print at a time."
      />
    </Head>
  );
};
