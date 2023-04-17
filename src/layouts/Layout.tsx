import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode, Fragment } from "react";
import Head from "next/head";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Athletix is a website for booking athletic fields in universities."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
