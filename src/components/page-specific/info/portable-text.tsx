import { PortableText } from "@portabletext/react";
import Link from "next/link";

export const PortableTextLayout: React.FC<{
  text: never[];
}> = ({ text }) => {
  if (!text) {
    return <></>;
  }
  return (
    <PortableText
      value={text}
      components={{
        list: ({ children }) => <ul>{children}</ul>,
        listItem: ({ children }) => (
          <li className="my-1 text-inherit">{children}</li>
        ),
        block: {
          h2: ({ children }) => <h2 className="mt-6">{children}</h2>,

          normal: ({ children }) => <p className="text-left">{children}</p>,
        },
        marks: {
          code: ({ children }) => {
            return <code className="text-inherit">{children}</code>;
          },
          link: ({ text, value }) => {
            return (
              <Link
                href={value.href}
                target="_blank"
                className="text-inherit underline"
              >
                {text}
              </Link>
            );
          },
        },
        types: {
          code: ({ value }) => (
            <code className="my-3 w-full text-inherit">
              {value.code.split("\n").map((line: string, index: number) => (
                <p key={index}>{line}</p>
              ))}
            </code>
          ),
          break: () => <br />,
        },
      }}
    />
  );
};
