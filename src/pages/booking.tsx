import React, { Fragment } from 'react'
import Banner from '@/components/Banner'
import Slots from '@/components/Slots'
import Layout from '@/layouts/Layout'

const Booking = () => {
    return (
        <Fragment>
            <Layout>
                <div className='mt-16 md:mt-24'>
                    <div className='w-screen'>
                        <Banner />
                        <div className='mx-auto grid max-w-screen-lg px-6 pb-20'>
                            <div>
                                <p className='text-xl font-bold text-blue-900'>Select a service</p>
                                <div
                                    className='mt-4 grid max-w-3xl gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3'
                                >
                                    <div className='relative'>
                                        <input
                                            className='peer hidden'
                                            id='radio_1'
                                            type='radio'
                                            name='radio'
                                        />
                                        <span
                                            className='absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-emerald-400'
                                        ></span>

                                        <label
                                            className='flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-emerald-600 peer-checked:text-white'
                                            htmlFor='radio_1'
                                        >
                                            <span className='mt-2 font-medium'>Football Field</span>
                                        </label>
                                    </div>
                                    <div className='relative'>
                                        <input
                                            className='peer hidden'
                                            id='radio_2'
                                            type='radio'
                                            name='radio'
                                        />
                                        <span
                                            className='absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-emerald-400'
                                        ></span>

                                        <label
                                            className='flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-emerald-600 peer-checked:text-white'
                                            htmlFor='radio_2'
                                        >
                                            <span className='mt-2 font-medium'>Basketball Field</span>
                                        </label>
                                    </div>
                                    <div className='relative'>
                                        <input
                                            className='peer hidden'
                                            id='radio_3'
                                            type='radio'
                                            name='radio'
                                        />
                                        <span
                                            className='absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-emerald-400'
                                        ></span>

                                        <label
                                            className='flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-emerald-600 peer-checked:text-white'
                                            htmlFor='radio_3'
                                        >
                                            <span className='mt-2 font-medium'>Badminton Field</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className='mt-8 font-serif text-xl font-bold text-blue-900'>
                                    Select a date
                                </p>
                                <div className='relative mt-4 w-56'>
                                    <div
                                        className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'
                                    >
                                        <svg
                                            aria-hidden='true'
                                            className='h-5 w-5 text-gray-500'
                                            fill='currentColor'
                                            viewBox='0 0 20 20'
                                            xmlns='http://www.w3.org/2000/svg'
                                        ><path
                                            fill-rule='evenodd'
                                            d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                                            clip-rule='evenodd'></path></svg>
                                    </div>
                                    <input
                                        datepicker-orientation='bottom'
                                        type='text'
                                        className='datepicker-input block w-full rounded-lg border border-emerald-300 bg-emerald-50 p-2.5 pl-10 text-emerald-800 outline-none ring-opacity-30 placeholder:text-emerald-800 focus:ring focus:ring-emerald-300 sm:text-sm'
                                        placeholder='Select date'
                                    />
                                </div>
                            </div>

                            <div>
                                <p className='mt-8 font-serif text-xl font-bold text-blue-900'>
                                    Select a time
                                </p>
                                <Slots />
                            </div>

                            <a href='/payment'>
                                <button
                                    className='mt-8 w-56 rounded-full border-8 border-emerald-500 bg-emerald-600 px-10 py-4 text-lg font-bold text-white transition hover:translate-y-1'
                                >Book Now</button>
                            </a>
                        </div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}

export default Booking