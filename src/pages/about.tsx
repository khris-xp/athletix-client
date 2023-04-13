import { Fragment } from 'react'
import Layout from '@/layouts/Layout'
import Image from 'next/image'
import { NextPage } from 'next'

const About: NextPage = () => {
    return (
        <Fragment>
            <Layout>
                <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 mb-20">
                    <div className="flex flex-col lg:flex-row justify-between gap-8">
                        <div className="w-full lg:w-5/12 flex flex-col justify-center">
                            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">About Us</h1>
                            <p className="font-normal text-base leading-6 text-gray-600 ">Athletix is a web application designed for booking sports fields in a university setting. It is developed as part of the Object-Oriented Programming (OOP) subject in Computer Engineering Major. The application provides an easy-to-use interface for users to book sports fields for various sports such as football, basketball, badminton, and more.</p>
                        </div>
                        <div className="w-full lg:w-8/12 ">
                            <Image className="w-full h-full" src="https://images.unsplash.com/photo-1557616223-c021d2a8e0f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" alt="A group of People" height={3000} width={3000} />
                        </div>
                    </div>

                    <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                        <div className="w-full lg:w-5/12 flex flex-col justify-center">
                            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Our Tech Stack</h1>
                            <div className="font-normal text-base leading-6 text-gray-600">
                                Frontend Development:
                                <ul className="pl-6 my-2 space-y-2">
                                    <li>
                                        <span className="mr-2">
                                            <Image src="https://cdn.icon-icons.com/icons2/2148/PNG/512/nextjs_icon_132160.png" alt="nextjs-image" className="h-6 w-6 inline-block" width={1000} height={1000} />
                                        </span>
                                        Next.js (with TypeScript)
                                    </li>
                                    <li>
                                        <span className="mr-2">
                                            <Image src="https://static-00.iconduck.com/assets.00/file-type-tailwind-icon-512x307-l0anq79h.png" alt="Tailwind CSS" className="h-4 w-6 inline-block" width={1000} height={1000} />
                                        </span>
                                        Tailwind CSS
                                    </li>
                                </ul>
                                Backend Development:
                                <ul className="pl-6 my-2 space-y-2">
                                    <li>
                                        <span className="mr-2">
                                            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png" alt="Python" className="h-6 w-6 inline-block" width={1000} height={1000} />
                                        </span>
                                        Python (with FastAPI)
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="w-full lg:w-8/12 lg:pt-8">
                            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
                                <div className="p-4 pb-6 flex justify-center flex-col items-center">
                                    <Image className="md:block hidden" src="https://avatars.githubusercontent.com/u/84142253?v=4" alt="khris-image" height={1000} width={1000} />
                                    <Image className="md:hidden block" src="https://avatars.githubusercontent.com/u/84142253?v=4" alt="khris-image" height={1000} width={1000} />
                                    <p className="font-medium text-sm leading-5 text-gray-800 mt-4">Khris Bharmmano</p>
                                    <p className="font-medium text-sm leading-5 text-gray-500 mt-4">65010107</p>
                                </div>
                                <div className="p-4 pb-6 flex justify-center flex-col items-center">
                                    <Image className="md:block hidden" src="https://avatars.githubusercontent.com/u/54632895?v=4" alt="kittipod-image" height={1000} width={1000} />
                                    <Image className="md:hidden block" src="https://avatars.githubusercontent.com/u/54632895?v=4" alt="kittipod-image" height={1000} width={1000} />
                                    <p className="font-medium text-sm leading-5 text-gray-800 mt-4">Kittipod Lambangchang</p>
                                    <p className="font-medium text-sm leading-5 text-gray-500 mt-4">650101077</p>
                                </div>
                                <div className="p-4 pb-6 flex justify-center flex-col items-center">
                                    <Image className="md:block hidden" src="https://avatars.githubusercontent.com/u/24198910?v=4" alt="teetouch-image" height={1000} width={1000} />
                                    <Image className="md:hidden block" src="https://avatars.githubusercontent.com/u/24198910?v=4" alt="teetouch-image" height={1000} width={1000} />
                                    <p className="font-medium text-sm leading-5 text-gray-800 mt-4">Teetouch Jaknamon</p>
                                    <p className="font-medium text-sm leading-5 text-gray-500 mt-4">65010478</p>
                                </div>
                                <div className="p-4 pb-6 flex justify-center flex-col items-center">
                                    <Image className="md:block hidden" src="https://scontent.fbkk7-3.fna.fbcdn.net/v/t39.30808-6/316961529_1534751090321595_5539287266596493204_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_eui2=AeHEuFsaTFVOoSnyjzso4XjavOYAES-GY5-85gARL4Zjn1YEJn_j2zWHUqM1n_V1xaNQaqPTexbgXCc8DDdGBKSk&_nc_ohc=h9Kv8ywaEGEAX_6zO3J&_nc_ht=scontent.fbkk7-3.fna&oh=00_AfC-GZEJ6qROYetDYRDcQHKTSUbdChdkt-0EpDrvv8SXfg&oe=64394D5D" alt="Alexa featured Img" height={1000} width={1000} />
                                    <Image className="md:hidden block" src="https://scontent.fbkk7-3.fna.fbcdn.net/v/t39.30808-6/316961529_1534751090321595_5539287266596493204_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_eui2=AeHEuFsaTFVOoSnyjzso4XjavOYAES-GY5-85gARL4Zjn1YEJn_j2zWHUqM1n_V1xaNQaqPTexbgXCc8DDdGBKSk&_nc_ohc=h9Kv8ywaEGEAX_6zO3J&_nc_ht=scontent.fbkk7-3.fna&oh=00_AfC-GZEJ6qROYetDYRDcQHKTSUbdChdkt-0EpDrvv8SXfg&oe=64394D5D" alt="Alexa featured Img" height={1000} width={1000} />
                                    <p className="font-medium text-sm leading-5 text-gray-800 mt-4">Chollasak Anuwareepong</p>
                                    <p className="font-medium text-sm leading-5 text-gray-500 mt-4">65010196</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}

export default About