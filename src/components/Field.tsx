import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getFieldService } from '@/services/field.services'

const Field: NextPage = ({ data }: any) => {
    return (
        <div>Data {data}</div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const data = await getFieldService();
        if (data) {
            return {
                props: {
                    data
                }
            };
        } else {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false
                }
            };
        }
    } catch (err) {
        console.log(err);
        return {
            props: {}
        }
    }
}

export default Field