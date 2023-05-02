import { NextPage } from 'next'
import { Fragment } from 'react'
import Icon from './Icon'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
    image: string;
    name: string;
    studentId: string;
    facebook_url: string;
    instagram_url: string;
    github_url: string;
}

const Member: NextPage<Props> = ({ image, name, studentId, facebook_url, instagram_url, github_url }) => {
    return (
        <Fragment>
            <div className='text-center text-gray-500 mb-32'>
                <Image
                    className='mx-auto mb-4 w-36 h-36 rounded-full'
                    src={image}
                    alt='member-Avatar'
                    height={1000}
                    width={1000}
                />
                <h3
                    className='mb-1 text-2xl font-bold tracking-tight text-gray-900'
                >
                    <Link href='/'>{name}</Link>
                </h3>
                <p>{studentId}</p>
                <Icon facebook_url={facebook_url} instagram_url={instagram_url} github_url={github_url} />
            </div>
        </Fragment>
    )
}

export default Member;
