import { Fragment, useState } from "react";
import {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import Layout from "@/layouts/Layout";
import {
  getEquipmentService,
  getEquipmentByIdService,
  editEquipmentService,
} from "@/services/equipment.services";
import { IUpdateEquipment } from "@/interfaces/equipment";
import { toast } from "react-hot-toast";
import router from "next/router";
import { Loading, Error } from '@/components';
import { useAuth } from "@/context/auth";

interface Props {
  id: string;
  name: string;
  price_per_unit: number;
  quantity: number;
  category: string;
}

const EditEquipmentPage: NextPage<Props> = ({
  id,
  name,
  price_per_unit,
  quantity,
  category,
}) => {
  const [equipment, setEquipment] = useState<IUpdateEquipment>({
    name: name,
    price_per_unit: price_per_unit,
    quantity: quantity,
    category: category,
  });

  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />
  }

  if (!isAdmin) {
    return <Error />
  }

  const handleEditEquipment = async () => {
    try {
      await editEquipmentService(id, equipment);
      toast.success("Equipment updated successfully");
      router.push("/equipment");
    } catch (err) {
      toast.error("Equipment updated failed");
    }
  };
  return (
    <Fragment>
      <Layout title="Athletix | Edit Equipment">
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-36">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Edit Field</p>
                  <p>Please fill out all the fields.</p>
                </div>
                <div className="lg:col-span-2">
                  <form>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label>Field Name</label>
                        <input
                          type="text"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setEquipment({
                              ...equipment,
                              name: event.target.value,
                            });
                          }}
                          value={equipment.name}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label>Booking Price</label>
                        <input
                          type="number"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="0"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setEquipment({
                              ...equipment,
                              price_per_unit: parseFloat(event.target.value),
                            });
                          }}
                          value={equipment.price_per_unit}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label>Quantity</label>
                        <input
                          type="number"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="0"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setEquipment({
                              ...equipment,
                              quantity: parseFloat(event.target.value),
                            });
                          }}
                          value={equipment.quantity}
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label>Category</label>
                        <select
                          className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                          value={equipment.category}
                          onChange={(
                            event: React.ChangeEvent<HTMLSelectElement>
                          ) => {
                            setEquipment({
                              ...equipment,
                              category: event.target.value,
                            });
                          }}
                          required
                        >
                          <option value="all">All</option>
                          <option value="badminton">Badminton</option>
                          <option value="football">Football</option>
                          <option value="basketball">Basketball</option>
                        </select>
                      </div>

                      <div className="md:col-span-5 text-right mt-5">
                        <div className="inline-flex items-end">
                          <button
                            type="button"
                            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleEditEquipment()}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const equipmentItems = await getEquipmentService();
    const paths = equipmentItems.map(
      (equipmentItems: { _Equipment__id: string }) => ({
        params: { id: equipmentItems._Equipment__id },
      })
    );

    return {
      paths,
      fallback: true,
    };
  } catch (err) {
    console.log(err);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  try {
    if (!params || !params.id || Array.isArray(params.id)) {
      return {
        notFound: true,
      };
    }
    const { id } = params;
    const equipmentItem = await getEquipmentByIdService(id);
    if (!equipmentItem) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        id: equipmentItem._Equipment__id,
        name: equipmentItem._Equipment__name,
        price_per_unit: equipmentItem._Equipment__price_per_unit,
        quantity: equipmentItem._Equipment__quantity,
        category: equipmentItem._Equipment__category,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default EditEquipmentPage;
