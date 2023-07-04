import type { NextPage } from "next";
import PrinterCard from "~/components/page-specific/printers/printer-card";
import Layout from "~/components/shared/layout";
import { api } from "~/utils/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

const Printers: NextPage = () => {
  const printersQuery = api.user.getPrinters.useQuery();
  const printers = printersQuery.data;

  return (
    <Layout>
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-[80rem] px-5"
      >
        <AccordionItem value="Starred">
          <AccordionTrigger>My starred printers</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="grid w-full max-w-[80rem] grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
      </div>
    </Layout>
  );
};

export default Printers;
