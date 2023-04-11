import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ReactNode, Fragment } from "react"

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Fragment>
            <Navbar />
            <main className="mt-20">{children}</main>
            <Footer />
        </Fragment>
    );
};

export default Layout