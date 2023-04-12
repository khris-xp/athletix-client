import { NextPage } from "next"
import { Fragment, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { logoutService } from "@/services/user.services"
import { useAuth } from "@/context/auth"

const Navbar: NextPage = () => {
    const [navbarMenu, setIsNavbarMenu] = useState<boolean>(false);
    const [userMenu, setIsUserMenu] = useState<boolean>(true);
    const { isAuthenticated } = useAuth();

    const handleNavbarMenu = (): void => {
        setIsNavbarMenu(!navbarMenu);
    };
    const handleUserMenu = (): void => {
        setIsUserMenu(!userMenu);
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
                                <Link href='/login' className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500'>
                                    <span className='relative'>Login</span>
                                </Link>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300" onClick={handleUserMenu}>
                                    <Image className="w-8 h-8 rounded-full" src="https://avatars.githubusercontent.com/u/84142253?v=4" width={1000} height={1000} alt="user-photo" />
                                </button>
                                <div className={`relative ${userMenu ? 'hidden' : 'block'} text-base list-none divide-y divide-gray-100 rounded-lg shadow`}>
                                    <div className="relative">
                                        <ul className="absolute right-0 z-10 py-2 mt-2 w-48 bg-white rounded-md shadow-lg border-2 ">
                                            <li>
                                                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleUserMenu}>
                                                    Dashboard
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
                        <button type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={handleNavbarMenu}>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className={`items-center justify-between ${navbarMenu ? 'hidden' : 'block'} w-full md:flex md:w-auto md:order-1`}>
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                            <li>
                                <Link href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0">Home</Link>
                            </li>
                            <li>
                                <Link href="/booking" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Booking</Link>
                            </li>
                            <li>
                                <Link href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">News</Link>
                            </li>
                            <li>
                                <Link href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">About</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </Fragment >
    )
}

export default Navbar