import React, { Fragment } from 'react'
import Image from 'next/image'
import { NextPage } from 'next'
import { useAuth } from '@/context/auth'
import Link from 'next/link'
import { deleteFieldService } from '@/services/field.services'
import { NextRouter, useRouter } from 'next/router'

interface Props {
    id: string;
    image: string;
    title: string;
    description: string;
}

const Card: NextPage<Props> = ({ id, image, title, description }) => {
    const { isAdmin } = useAuth();
    const router: NextRouter = useRouter()

    const handleDelete = async (): Promise<void> => {
        try {
            await deleteFieldService(id)
            router.reload();
        } catch (err: unknown) {
            throw new Error('Delete field failed');
        }
    }

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
                <div className='p-7 my-auto'>
                    <h1 className='text-2xl font-semibold text-gray-700'>{title}</h1>
                    <p className='text-xl font-light leading-relaxed text-gray-400 mt-5'>
                        {description}
                    </p>
                </div>
                {isAdmin ? (
                    <Fragment>
                        <div className='p-8'>
                            <Link href={'/'}>
                                <button className="text-blue-500 mt-2 font-semibold hover:underline">
                                    Edit
                                </button>
                            </Link>
                            <button className="text-red-500 ml-2 mt-2 font-semibold hover:underline" onClick={() => handleDelete()}>
                                Delete
                            </button>
                        </div>
                    </Fragment>
                ) : null}
            </div>

        </Fragment>
    )
}

export default Card