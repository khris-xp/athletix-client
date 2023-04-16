import { NextPage } from "next"
import { Fragment, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { logoutService } from "@/services/user.services"
import { useAuth } from "@/context/auth"
import { NextRouter, useRouter } from "next/router"

const Navbar: NextPage = () => {
    const [navbarMenu, setIsNavbarMenu] = useState<boolean>(true);
    const [userMenu, setIsUserMenu] = useState<boolean>(true);
    const [newsMenu, setIsNewsMenu] = useState<boolean>(true);
    const { isAuthenticated, user, isAdmin } = useAuth();
    const Router: NextRouter = useRouter();

    const handleNavbarMenu = (): void => {
        setIsNavbarMenu(!navbarMenu);
    };
    const handleUserMenu = (): void => {
        setIsUserMenu(!userMenu);
    }

    const handleNewsMenu = (): void => {
        setIsNewsMenu(!newsMenu);
    }

    return (
        <Fragment>
            <nav className="bg-white border-gray-200" style={{ position: "sticky", top: "0", zIndex: "1000" }}>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href="/" className="flex items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">Athletix</span>
                    </Link>
                    <div className="flex items-center md:order-2">
                        {!isAuthenticated ? (
                            <Fragment>
                                <Link href='/login'>
                                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center mr-3 md:mr-0">
                                        Sign in
                                    </button>
                                </Link>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <button type="button" className="flex mr-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300" onClick={handleUserMenu}>
                                    <Image className="w-12 h-12 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-NBM75ZQZZnw1LjpWznA06oYugMc2aPgGvMm9F_3XoeANFiUtQ5OZ_tq7ykNQCPrHoAE&usqp=CAU" width={1000} height={1000} alt="user-photo" priority />
                                </button>
                                <div className={`relative ${userMenu ? 'hidden' : 'block'} text-base list-none divide-y divide-gray-100 rounded-lg shadow`}>
                                    <div className="relative">
                                        <ul className="absolute right-0 z-10 py-2 mt-4 w-48 bg-white rounded-md shadow-lg border-2 ">
                                            <li>
                                                <p className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 uppercase border-b-2">
                                                    {user?._Person__fullname}
                                                </p>
                                            </li>
                                            <li>
                                                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleUserMenu}>
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleUserMenu}>
                                                    History
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={logoutService}>
                                                    Sign out
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Fragment>
                        )}
                        <button type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" onClick={handleNavbarMenu}>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className={`items-center justify-between ${navbarMenu ? 'hidden' : 'block'} w-full md:flex md:w-auto md:order-1`}>
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                            <li>
                                <Link href="/" className={`block py-2 pl-3 pr-4 ${Router.pathname === '/' ? ('text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700') : ('text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700')} md:p-0`}>Home</Link>
                            </li>
                            <li>
                                <Link href="/booking" className={`block py-2 pl-3 pr-4 ${Router.pathname === '/booking' ? ('text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700') : ('text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700')} md:p-0`}>Booking</Link>
                            </li>
                            <li>
                                {isAdmin ?
                                    (
                                        <Fragment>
                                            <button className={`flex items-center py-2 pl-3 pr-4 ${Router.pathname === '/news' ? ('text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700') : ('text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700')} md:p-0`}
                                                onClick={handleNewsMenu}>News <svg className="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
                                            <div className={`relative ${newsMenu ? 'hidden' : 'block'} text-base list-none divide-y divide-gray-100 rounded-lg shadow`}>
                                                <div className="relative">
                                                    <ul className="absolute right-0 z-10 py-2 mt-4 w-48 bg-white rounded-md shadow-lg border-2 ">
                                                        <li>
                                                            <Link href="/news" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleNewsMenu}>
                                                                News Page
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/news/create" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleNewsMenu}>
                                                                Create News
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Fragment>
                                    ) : (
                                        <Link href="/news" className={`block py-2 pl-3 pr-4 ${Router.pathname === '/news' ? ('text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700') : ('text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700')} md:p-0`}>News</Link>
                                    )}

                            </li>
                            {isAdmin ?
                                (
                                    <li>
                                        <Link href="/equipment" className={`block py-2 pl-3 pr-4 ${Router.pathname === '/equipment' ? ('text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700') : ('text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700')} md:p-0`}>Equipment</Link>
                                    </li>
                                ) : null
                            }
                            <li>
                                <Link href="/about" className={`block py-2 pl-3 pr-4 ${Router.pathname === '/about' ? ('text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700') : ('text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700')} md:p-0`}>About</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </Fragment >
    )
}

export default Navbar