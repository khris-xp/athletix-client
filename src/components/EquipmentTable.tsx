import { Fragment } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { deleteEquipmentService } from '@/services/equipment.services'
import { toast } from 'react-hot-toast'
import router from 'next/router';

interface Props {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
}

const EquipmentTable: NextPage<Props> = ({ id, name, price, quantity, category }) => {

    const handleDeleteEquipment = async () => {
        try {
            await deleteEquipmentService(id);
            toast.success('Delete Equipment Success');
            setTimeout(() => {
                router.reload();
            }, 400)
        } catch (err) {
            toast.error('Delete Equipment Failed');
        }
    }

    return (
        <Fragment>
            <tbody>
                <tr className="bg-white border-b text-center">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap uppercase">
                        {name}
                    </th>
                    <td className="px-6 py-4">
                        {price} Bath
                    </td>
                    <td className="px-6 py-4">
                        {quantity}
                    </td>
                    <td className="px-6 py-4 uppercase">
                        {category}
                    </td>
                    <td className="px-6 py-4">
                        <div className='space-x-3'>
                            <Link href={`/equipment/edit/${id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                            <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => handleDeleteEquipment()}>Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </Fragment>
    )
}

export default EquipmentTable