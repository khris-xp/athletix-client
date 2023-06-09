import { Fragment, useState } from "react";
import {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import {
  getFieldService,
  getFieldDetailService,
  editFieldService,
} from "@/services/field.services";
import Layout from "@/layouts/Layout";
import { updateSlots } from "@/constants/slots";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { uploadImageService } from "@/services/file.services";
import { useAuth } from "@/context/auth";
import { Loading, Error } from "@/components";

interface Props {
  field_id: string;
  name: string;
  description: string;
  price_by_slot: number;
  category: string;
  type: string;
  image: string;
}

const EditFieldPage: NextPage<Props> = ({
  field_id,
  name,
  description,
  price_by_slot,
  category,
  type,
  image,
}) => {
  const [field, setField] = useState({
    name: name,
    description: description,
    price_by_slot: price_by_slot,
    category: category,
    type: type,
    slot: updateSlots,
    image: image,
  });
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  if (isLoading) {
    return <Loading />;
  }

  if (!isAdmin && isAuthenticated) {
    return <Error title="401" />;
  }

  const handleEditField = async () => {
    try {
      await editFieldService(field, field_id);
      toast.success("Field updated successfully");
    } catch (err) {
      toast.error("Failed to update field");
    }
  };

  return (
    <Fragment>
      <Layout title="Athletix | Edit Field">
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-36">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Edit Field</p>
                  <p>Please fill out all the fields.</p>
                  <Image
                    className="w-full h-60"
                    src={
                      /^https:/.test(image)
                        ? image
                        : `http://127.0.0.1:4000/${image}`
                    }
                    alt="field-image"
                    width={1000}
                    height={1000}
                  />
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
                            setField({ ...field, name: event.target.value });
                          }}
                          value={field.name}
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
                          value={field.description}
                        ></textarea>
                      </div>

                      <div className="md:col-span-5">
                        <label>Field Image</label>
                        <input
                          type="file"
                          id="file_input"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-4"
                          placeholder="Your Slip URL"
                          required
                          onChange={async (event) => {
                            if (!event.target.files) return;
                            const fileData = new FormData();
                            fileData.append(
                              "file",
                              event.target.files[0],
                              event.target.files[0]["name"]
                            );
                            const name = await uploadImageService(fileData);
                            setField({ ...field, image: name.filename });
                          }}
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
                              price_by_slot: parseFloat(event.target.value),
                            });
                          }}
                          value={field.price_by_slot}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label>Field Category</label>
                        <select
                          className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                          onChange={(
                            event: React.ChangeEvent<HTMLSelectElement>
                          ) => {
                            setField({
                              ...field,
                              category: event.target.value,
                            });
                          }}
                          value={field.category}
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
                          onChange={(
                            event: React.ChangeEvent<HTMLSelectElement>
                          ) => {
                            setField({ ...field, type: event.target.value });
                          }}
                          value={field.type}
                          required
                        >
                          <option value={"Indoor"}>Indoor</option>
                          <option value={"Outdoor"}>Outdoor</option>
                        </select>
                      </div>

                      <div className="md:col-span-5 text-right mt-5">
                        <div className="inline-flex items-end">
                          <button
                            type="button"
                            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleEditField()}
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
    const fieldItems = await getFieldService();
    const paths = fieldItems.map((fieldItem: { id: string }) => ({
      params: { id: fieldItem.id },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (err: unknown) {
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
    const fieldItem = await getFieldDetailService(id);
    if (!fieldItem) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        field_id: fieldItem.id,
        name: fieldItem.name,
        description: fieldItem.description,
        price_by_slot: fieldItem.price_by_slot,
        category: fieldItem.category,
        type: fieldItem.type,
        image: fieldItem.image,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default EditFieldPage;
