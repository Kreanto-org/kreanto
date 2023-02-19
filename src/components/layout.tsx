import { Header } from "~/components/header";

const Layout: React.FC<React.PropsWithChildren<{ title?: string }>> = ({
  title,
  children,
}) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <Header title={title} />
      {children}
    </main>
  );
};

export default Layout;
