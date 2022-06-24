import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Head>
        <title>NUMERUS // K.O</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
