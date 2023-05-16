import type { NextPage } from "next";
import PrinterCard from "~/components/page-specific/printers/printer-card";
import Layout from "~/components/shared/layout";
import { api } from "~/utils/api";

const Printers: NextPage = () => {
  const printersQuery = api.user.getPrinters.useQuery();
  const printers = printersQuery.data;
  console.log(printers);
  return (
    <Layout>
      {printers?.map(({ name, slug, image, printerProfile: profile }, i) => (
        <PrinterCard
          name={name}
          slug={slug}
          image={image}
          points={profile?.points}
          availability={profile?.printTime}
          color={profile?.colorType}
          size={Math.min(
            profile?.length ?? 0,
            profile?.width ?? 0,
            profile?.height ?? 0
          )}
          key={i}
        />
      ))}
    </Layout>
  );
};

export default Printers;
