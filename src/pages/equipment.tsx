import { Fragment } from 'react'
import Layout from '@/layouts/Layout'
import { GetServerSideProps, NextPage } from 'next'
import EquipmentTable from '@/components/EquipmentTable'
import { getEquipmentService } from '@/services/equipment.services'
import { IEquipment } from '@/interfaces/equipment'

interface Props {
    data: IEquipment[]
}

const Equipment: NextPage<Props> = ({ data }) => {
    return (
        <Fragment>
            <Layout>
                <div className="relative overflow-auto shadow-md sm:rounded-lg mb-20">
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