import { Fragment, useState } from "react";
import Layout from "@/layouts/Layout";
import { NextPage } from "next";
import { IUpdateEquipment } from "@/interfaces/equipment";
import { CreateEquipmentInitialValues } from "@/constants/equipment";
import { createEquipmentService } from "@/services/equipment.services";
import router from "next/router";
import { toast } from "react-hot-toast";

const CreateEquipmentPage: NextPage = () => {
  const [equipment, setEquipment] = useState<IUpdateEquipment>(
    CreateEquipmentInitialValues
  );
  const handleCreateEquipment = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      event.preventDefault();
      await createEquipmentService(equipment);
      setEquipment(CreateEquipmentInitialValues);
      router.push("/equipment");
      toast.success("Equipment created successfully");
    } catch (err) {
      toast.error("Failed to create equipment");
    }
  };

  return (
    <Fragment>
      <Layout>
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-36">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Create Equipment</p>
                  <p>Please fill out all the fields.</p>
                </div>
                <div className="lg:col-span-2">
                  <form onSubmit={handleCreateEquipment}>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label>Equipment Name</label>
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
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label>Price</label>
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
                          required
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
                          required
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
                            type="submit"
                            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
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

export default CreateEquipmentPage;
