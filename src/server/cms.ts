import { createClient } from "next-sanity";
import { IconType } from "react-icons";

export const cms = createClient({
  projectId: "6wrn8bhl",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: false,
});

export interface InfoPageType {
  title: string;
  slug: string;
  body: never[];
  icon: string;
}
