import Head from "next/head";

export const Header: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <Head>
      <title>{`${title ? title + " | " : ""}Kreanto`}</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta charSet="UTF-8" />
      <link rel="manifest" href="manifest.json" />
      <meta
        name="keywords"
        content="design, designer, maker, creator, create, kreanto, 3d, 3D, kreanto, kreanto org, 
        kreanto.org, help, 3d printing, 3d print, 3D print, 3D printing, 3D modeling, 3D model, 3d modeling, 3d model"
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
      <meta
        name="description"
        content="Kreanto connects those without access to 3D printing to people who do, bridging the gap in STEAM one print at a time."
      />
    </Head>
  );
};
