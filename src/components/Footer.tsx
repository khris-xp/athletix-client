import Link from 'next/link'
import { NextPage } from 'next'
import { Fragment } from 'react'

const Footer: NextPage = () => {
    return (
        <Fragment>
            <footer
                className='fixed bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 z-[1000]'
            >
                <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'
                ><Link href='/' className='hover:underline'>Athletix</Link>
                </span>
                <ul
                    className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'
                >
                    <li>
                        <Link href='/' className='mr-4 hover:underline md:mr-6'>Home</Link>
                    </li>
                    <li>
                        <Link href='/booking' className='mr-4 hover:underline md:mr-6'>Booking</Link>
                    </li>
                    <li>
                        <Link href='/news' className='mr-4 hover:underline md:mr-6'>News</Link>
                    </li>
                    <li>
                        <Link href='/about' className='hover:underline'>About</Link>
                    </li>
                </ul>
            </footer>
        </Fragment>
    )
}

export default Footer