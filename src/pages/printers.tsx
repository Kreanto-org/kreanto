import PrinterCard from "~/components/page-specific/printers/printer-card";
import Layout from "~/components/shared/layout";
import { api } from "~/utils/api";

const Printers: React.FC = () => {
  const printersQuery = api.user.getPrinters.useQuery();
  const printers = printersQuery.data;
  console.log(printers);
  return (
    <Layout>
      {printers?.map((printer, i) => (
        <PrinterCard name={printer.name} image={printer.image} key={i} />
      ))}
    </Layout>
  );
};

export default Printers;
