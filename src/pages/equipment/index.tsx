import { Fragment } from "react";
import Layout from "@/layouts/Layout";
import { GetServerSideProps, NextPage } from "next";
import { EquipmentTable } from "@/components";
import { getEquipmentService } from "@/services";
import { IEquipment } from "@/interfaces/equipment";
import Link from "next/link";
import { useAuth } from "@/context/auth";
import { Loading, Error } from "@/components";

interface Props {
  data: IEquipment[];
}

const EquipmentPage: NextPage<Props> = ({ data }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }
  if (!isAdmin && !isAuthenticated) {
    return <Error title="401" />;
  }
  return (
    <Fragment>
      <Layout title="Athletix | Equipment">
        <div className="relative overflow-auto shadow-md sm:rounded-lg mb-20">
          <div className="flex justify-end p-4">
            <Link href="/equipment/create">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 focus:outline-none">
                + Create
              </button>
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
              <EquipmentTable
                key={equipment.id}
                id={equipment.id}
                name={equipment.name}
                price={equipment.price_per_unit}
                quantity={equipment.quantity}
                category={equipment.category}
              />
            ))}
          </table>
        </div>
      </Layout>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const data: IEquipment = await getEquipmentService();
    if (data) {
      return {
        props: {
          data,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  } catch (err: unknown) {
    console.log(err);
    return {
      props: {},
    };
  }
};

export default EquipmentPage;
