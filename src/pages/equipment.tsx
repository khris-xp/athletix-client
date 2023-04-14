import { Fragment } from 'react'
import Layout from '@/layouts/Layout'
import { GetServerSideProps, NextPage } from 'next'
import EquipmentTable from '@/components/EquipmentTable'
import { getEquipmentService } from '@/services/equipment.services'
import { IEquipment } from '@/interfaces/equipment'
import Link from 'next/link'

interface Props {
    data: IEquipment[]
}

const Equipment: NextPage<Props> = ({ data }) => {
    return (
        <Fragment>
            <Layout>
                <div className="relative overflow-auto shadow-md sm:rounded-lg mb-20">
                    <div className='flex justify-end p-4'>
                        <Link href='/create-equipment'>
                            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 focus:outline-none'>+ Create</button>
                        </Link>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Equipment Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {data.map((equipment: IEquipment) => (
                            <EquipmentTable key={equipment._Equipment__id} id={equipment._Equipment__id} name={equipment._Equipment__name} price={equipment._Equipment__price_per_unit} quantity={equipment._Equipment__quantity} />
                        ))}
                    </table>
                </div>
            </Layout>
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const data: IEquipment = await getEquipmentService();
        if (data) {
            return {
                props: {
                    data
                }
            };
        } else {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            };
        }
    } catch (err: unknown) {
        console.log(err);
        return {
            props: {}
        };
    }
};

export default Equipment