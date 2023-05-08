import { createClient } from "next-sanity";
// import * as Icons from "react-icons/fa";
import { FaBowlingBall } from "react-icons/fa";
import type { IconBaseProps, IconType } from "react-icons";

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

export const DynamicFontAwesomeIcon: (name: string | undefined) => IconType = (
  name
) => {
  // if (name && Object.keys(Icons).includes(name)) {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   return Icons[name];
  // }
  return FaBowlingBall;
};

interface IDynamicProps extends IconBaseProps {
  name: string | undefined;
}

export const DynamicIcon: React.FC<IDynamicProps> = ({ name, ...rest }) => {
  const Icon = DynamicFontAwesomeIcon(name);
  return <Icon {...rest} />;
};
