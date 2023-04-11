import { NextPage } from "next"
import { Fragment, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import MenuIcon from '/public/hamburger.svg'

const Navbar: NextPage = () => {
    const [openMenu, setIsOpenMenu] = useState<boolean>(false);
    return (
        <Fragment>
            <nav
                className='bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600'
            >
                <div className='max-w-6xl mx-auto px-4 py-1'>
                    <div className='flex justify-between'>
                        <div
                            className='container flex flex-wrap items-center justify-between mx-auto'
                        >
                            <Link href='/' className='flex items-center'>
                                <span
                                    className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'
                                >Athletix</span>
                            </Link>
                            <div className='flex md:order-2'>
                                <Link href='/booking'>
                                    <button
                                        type='button'
                                        className='md:block hidden items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500'
                                    >
                                        Booking
                                    </button></Link>
                            </div>
                            <div
                                className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
                            >
                                <ul
                                    className='flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'
                                >
                                    <li>
                                        <Link
                                            href='/'
                                            className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                        >Home</Link>
                                    </li>
                                    <li>
                                        <Link
                                            href='/'
                                            className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                        >News</Link>
                                    </li>
                                    <li>
                                        <Link
                                            href='/'
                                            className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                        >About</Link>
                                    </li>
                                    <li>
                                        <Link
                                            href='/login'
                                            className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                        >Login</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='md:hidden flex items-center'>
                            <button
                                className='outline-none mobile-menu-button'
                                onClick={() => setIsOpenMenu(!openMenu)}
                            >
                                <Image src={MenuIcon} alt="menu-icon" height={20} width={20} className='h-6 w-6 text-gray-500' />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className={`${openMenu ? 'flex' : 'hidden'} z-50 mt-8 flex-1 justify-center md:mt-0 md:block md:pb-0`}>
                <ul className='items-center justify-center space-y-8 text-center md:flex md:space-x-6 md:space-y-0 mt-10 mb-5'>
                    <li>
                        <Link
                            href='/'
                            className='text-black hover:text-second-color'
                        >Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/'
                            className='text-black hover:text-second-color'
                        >News
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/'
                            className='text-black hover:text-second-color'
                        >About
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/'
                            className='text-black hover:text-second-color'
                        >Login
                        </Link>
                    </li>
                </ul>
            </div>
        </Fragment >
    )
}

export default Navbar