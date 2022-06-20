import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children?: JSX.Element | JSX.Element[];
  title: string;
};

const Layout = ({ children, title }: Props) => {
  return (
    <div>
      <Head>
        <title>{title + " // NUMERUS"}</title>
      </Head>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
