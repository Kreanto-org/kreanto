import { Header } from "~/components/shared/header";
import Navbar from "./navbar";
import Footer from "./footer";

const Layout: React.FC<React.PropsWithChildren<{ title?: string }>> = ({
  title,
  children,
}) => {
  return (
    <main className="flex min-h-screen flex-col items-center bg-bg-100 pb-[10rem] text-text-100">
      <Header title={title} />
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
