import React, { Fragment, useState } from "react";
import Layout from "@/layouts/Layout";
import { ICreateField } from "@/interfaces/field";
import { CreateFieldInitialValues } from "@/constants/field";
import { Loading, Error } from '@/components';
import { createFieldService, uploadImageService } from "@/services";
import router from "next/router";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useAuth } from "@/context/auth";

const CreateFieldPage = () => {
  const [field, setField] = useState<ICreateField>(CreateFieldInitialValues);
  const handleCreateField = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      console.log(field);
      await createFieldService(field);
      setField(CreateFieldInitialValues);
      router.push("/");
      toast.success("Field created successfully");
    } catch (err) {
      toast.error("Failed to create field");
    }
  };

  const { isAuthenticated, isLoading, isAdmin } = useAuth();

  if (isLoading) {
    return <Loading />
  }

  if (!isAdmin && !isAuthenticated) {
    return <Error title="401" />
  }

  return (
    <Fragment>
      <Layout title="Athletix | Create Field">
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-36">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Create Field</p>
                  <p>Please fill out all the fields.</p>
                  {!field.image ? (
                    <Image
                      src="https://wipelectric.com/wp-content/uploads/2021/06/Ref-Trinoi1-1024x679.jpg"
                      alt="banner-image"
                      className="mt-6 px-5 lg:px-2 lg:pr-10"
                      height={1000}
                      width={1000}
                    />
                  ) : (
                    <Image
                      src={"http://localhost:4000/" + field.image}
                      alt="banner-image"
                      className="mt-6 px-5 lg:px-2 lg:pr-10"
                      height={1000}
                      width={1000}
                    />
                  )
                  }
                </div>
                <div className="lg:col-span-2">
                  <form onSubmit={handleCreateField}>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label>Field Name</label>
                        <input
                          type="text"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setField({ ...field, name: event.target.value });
                          }}
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label>Field Description</label>
                        <textarea
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 pb-16"
                          onChange={(
                            event: React.ChangeEvent<HTMLTextAreaElement>
                          ) => {
                            setField({
                              ...field,
                              description: event.target.value,
                            });
                          }}
                        ></textarea>
                      </div>

                      <div className="md:col-span-5">
                        <label>Field Image Url</label>
                        <input
                          type="file"
                          id="file_input"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-4"
                          placeholder="Your Slip URL"
                          required
                          onChange={async (event
                          ) => {
                            if (!event.target.files) return;
                            const fileData = new FormData();
                            fileData.append('file', event.target.files[0], event.target.files[0]["name"])
                            console.log(fileData)
                            const name = await uploadImageService(fileData)
                            console.log(name)
                            setField({ ...field, image: name.filename });

                          }
                          }
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
                            setField({
                              ...field,
                              price_by_slot: parseInt(event.target.value),
                            });
                          }}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label>Field Category</label>
                        <select
                          className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                          value={field.category}
                          onChange={(
                            event: React.ChangeEvent<HTMLSelectElement>
                          ) => {
                            setField({
                              ...field,
                              category: event.target.value,
                            });
                          }}
                          required
                        >
                          <option value={"Football"}>Football</option>
                          <option value={"Basketball"}>Basketball</option>
                          <option value={"Badminton"}>Badminton</option>
                          <option value={"Tennis"}>Tennis</option>
                        </select>
                      </div>

                      <div className="md:col-span-1">
                        <label>Field Type</label>
                        <select
                          className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                          value={field.type}
                          onChange={(
                            event: React.ChangeEvent<HTMLSelectElement>
                          ) => {
                            setField({ ...field, type: event.target.value });
                          }}
                          required
                        >
                          <option value={"Indoor"}>Indoor</option>
                          <option value={"Outdoor"}>Outdoor</option>
                        </select>
                      </div>

                      <div className="md:col-span-5 text-right mt-5">
                        <div className="inline-flex items-end">
                          <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
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

export default CreateFieldPage;
