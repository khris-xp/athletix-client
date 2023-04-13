import { NextPage } from 'next'
import { Fragment } from 'react'
import Image from 'next/image'
import { format } from 'date-fns';
import Link from 'next/link';
import { useAuth } from '@/context/auth';
import { deleteNewService } from '@/services/news.services';
import { useRouter } from 'next/router';

interface Props {
    id: string;
    title: string;
    description: string;
    createdDate: string;
}

const NewsCard: NextPage<Props> = ({ id, title, description, createdDate }) => {
    const createdFormatDate = new Date(createdDate);
    const { isAdmin } = useAuth();
    const router = useRouter()
    const createdAt = format(createdFormatDate, 'dd MMM yyyy  HH:mm');
    const [formattedDate, formattedTime] = createdAt.split('  ');

    const handleEdit = () => {
        console.log(`Edit button clicked for news with ID: ${id}`);
    };

    const handleDelete = async (): Promise<void> => {
        try {
            await deleteNewService(id)
            router.reload();
        } catch (err) {
            throw new Error('Delete news failed');
        }
    };
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
                    {isAdmin ? (
                        <Fragment>
                            <button className="text-blue-500 mt-2" onClick={handleEdit}>
                                Edit
                            </button>
                            <button className="text-red-500 ml-2 mt-2" onClick={handleDelete}>
                                Delete
                            </button>
                        </Fragment>
                    ) : null}
                </div>
            </div>
        </Fragment>
    )
}

export default NewsCard