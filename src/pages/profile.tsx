import React, { Fragment } from 'react'
import Image from 'next/image'
import { NextPage } from 'next'
import Layout from '@/layouts/Layout';

const Profile: NextPage = () => {
    return (
        <Fragment>
            <Layout>
                <main className="profile-page">
                    <section className="relative" style={{ height: "400px" }}>
                        <div
                            className="absolute top-0 w-full h-full bg-center bg-cover"
                            style={{
                                backgroundImage:
                                    "url('https://media.istockphoto.com/id/1294407182/photo/playing-field.jpg?b=1&s=170667a&w=0&k=20&c=UqobgP0B9PnhDYKCXOnl0JRfU5Grow-ZwpprUoTTc2s=')"
                            }}
                        >
                            <span
                                id="blackOverlay"
                                className="w-full h-full absolute opacity-50 bg-black"
                            ></span>
                        </div>
                        <div
                            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                            style={{ height: "70px" }}
                        >
                            <svg
                                className="absolute bottom-0 overflow-hidden"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none"
                                version="1.1"
                                viewBox="0 0 2560 100"
                                x="0"
                                y="0"
                            >
                                <polygon
                                    className="text-gray-300 fill-current"
                                    points="2560 0 2560 100 0 100"
                                ></polygon>
                            </svg>
                        </div>
                    </section>
                    <section className="relative py-6 bg-gray-300 min-h-screen">
                        <div className="container mx-auto px-4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                                <div className="px-6">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                            <div className="relative">
                                                <Image
                                                    alt="profile-image"
                                                    src='https://avatars.githubusercontent.com/u/84142253?v=4'
                                                    className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                                                    style={{ maxWidth: "150px" }}
                                                    height={1000}
                                                    width={1000}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                            <div className="py-6 px-3 mt-32 sm:mt-0">
                                                <button
                                                    className="bg-blue-500 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                                    type="button"
                                                    style={{ transition: "all .15s ease" }}
                                                >
                                                    Connect
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                                <div className="mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                                        22
                                                    </span>
                                                    <span className="text-sm text-gray-500">Friends</span>
                                                </div>
                                                <div className="mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                                        10
                                                    </span>
                                                    <span className="text-sm text-gray-500">Photos</span>
                                                </div>
                                                <div className="lg:mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                                        89
                                                    </span>
                                                    <span className="text-sm text-gray-500">Comments</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center ">
                                        <h3 className="text-4xl font-semibold leading-normal text-gray-800 mb-2">
                                            Khris Bharmmano
                                        </h3>
                                        <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                                            <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                                            Ladkrabang, Bankok
                                        </div>
                                        <div className="mb-2 text-gray-700 mt-10">
                                            <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                                            Student - Computer Engineering
                                        </div>
                                        <div className="mb-2 text-gray-700">
                                            <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                                            King Mongkut&apos;s Institute of Technology Ladkrabang
                                        </div>
                                    </div>
                                    <div className="mt-10 py-10 border-t border-gray-300 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <p className="mb-4 text-lg leading-relaxed text-gray-800">
                                                    A passionate computer engineering student at KMITL (CE 61) and member of SAIG Laboratory. Interested in Web development.
                                                </p>
                                                <a
                                                    href="#pablo"
                                                    className="font-normal text-blue-500"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    Show more
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </Layout>
        </Fragment >
    )
}

export default Profile