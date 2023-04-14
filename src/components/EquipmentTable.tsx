import { Fragment } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

const EquipmentTable: NextPage<any> = ({ name, price, quantity }) => {
    return (
        <Fragment>
            <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {name}
                    </th>
                    <td className="px-6 py-4">
                        {price} Bath
                    </td>
                    <td className="px-6 py-4">
                        {quantity}
                    </td>
                    <td className="px-6 py-4">
                        Football
                    </td>
                    <td className="px-6 py-4">
                        <div className='space-x-3'>
                            <Link href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                            <Link href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</Link>
                        </div>
                    </td>
                </tr>
            </tbody>
        </Fragment>
    )
}

export default EquipmentTable