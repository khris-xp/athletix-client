import { NextPage } from 'next'
import { Fragment } from 'react'
import Image from 'next/image'
import { format } from 'date-fns';
import Link from 'next/link';

interface Props {
    id: string;
    title: string;
    description: string;
    createdDate: string;
}

const NewsCard: NextPage<Props> = ({ id, title, description, createdDate }) => {
    const createdFormatDate = new Date(createdDate);
    const createdAt = format(createdFormatDate, 'dd MMM yyyy  HH:mm');
    const [formattedDate, formattedTime] = createdAt.split('  ');
    return (
        <Fragment>
            <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="bg-white p-6 rounded-lg">
                    <Link href={`/news/${id}`}>
                        <Image className="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72  rounded w-full object-cover object-center mb-6" src="https://www.fieldturf.co.th/wp-content/uploads/2022/01/20220116_151911-scaled.jpg" alt="Image Size 720x400" height={1000} width={1000} />
                    </Link>
                    <h3 className="tracking-widest text-blue-500 text-xs font-medium title-font">News</h3>
                    <h2 className="text-lg text-gray-900 font-medium title-font my-2 uppercase">{title}</h2>
                    <p className="leading-relaxed text-base">{description}</p>
                    <p className="mt-4 text-xs text-gray-500"> Created on: {formattedDate} at {formattedTime}</p>
                </div>
            </div>
        </Fragment>
    )
}

export default NewsCard