import React, { Fragment } from 'react'
import Image from 'next/image'
import { NextPage } from 'next'

interface Props {
    image: string
    title: string
    description: string
}

const Card: NextPage<Props> = ({ image, title, description }) => {
    return (
        <Fragment>
            <div
                className='shadow-md mx-auto max-w-sm transform hover:-translate-y-1 duration-300 hover:shadow-xl cursor-pointer'
            >
                <div className='max-h-140 overflow-hidden'>
                    <Image
                        className='w-full h-60'
                        src={image}
                        alt='field-image'
                        width={1000}
                        height={1000}
                    />
                </div>
                <div className='p-7 my-auto pb-12'>
                    <h1 className='text-2xl font-semibold text-gray-700'>{title}</h1>
                    <p className='text-xl font-light leading-relaxed text-gray-400 mt-5'>
                        {description}
                    </p>
                </div>
            </div>

        </Fragment>
    )
}

export default Card