import { Fragment } from "react";
import { NextPage } from "next";
import Layout from "@/layouts/Layout";
import { useAuth } from "@/context/auth";
import Link from "next/link";
import { Loading, Error } from '@/components';

const ProfilePage: NextPage = () => {
  const { isAuthenticated, isCustomer, user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />
  }
  if (!isCustomer && !isAuthenticated) {
    return <Error />
  }

  return (
    <Fragment>
      <Layout title="Athletix | Profile">
        <main className="profile-page">
          <section className="relative" style={{ height: "400px" }}>
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://media.istockphoto.com/id/1294407182/photo/playing-field.jpg?b=1&s=170667a&w=0&k=20&c=UqobgP0B9PnhDYKCXOnl0JRfU5Grow-ZwpprUoTTc2s=')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
              style={{ height: "70px" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-300 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-6 bg-gray-300 min-h-screen">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="bg-indigo-200 text-indigo-500 h-24 w-24 rounded-full m-6 p-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-4xl font-semibold leading-normal text-gray-800 mb-2">
                      {user?.fullname}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                      {user?.account.role}
                    </div>
                    <div className="flex justify-end font-semibold hover:underline text-blue-600 ">
                      <Link href="/change-password">Change Password</Link>
                    </div>
                  </div>
                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                  <section className="py-1 bg-blueGray-50">
                    <div className="px-4 mx-auto mt-6 w-8/12">
                      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 ">
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                          <form>
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                              User Information
                            </h6>
                            <div className="flex flex-wrap">
                              <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                  <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                  >
                                    Fullname
                                  </label>
                                  <p className="py-2 px-1">
                                    {user?.fullname}
                                  </p>
                                </div>
                              </div>
                              <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                  <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                  >
                                    Email address
                                  </label>
                                  <p className="py-2 px-1">
                                    {user?.email}
                                  </p>
                                </div>
                              </div>
                              <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                  <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                  >
                                    Birth Date
                                  </label>
                                  <p className="py-2 px-1">
                                    {user?.birth_date}
                                  </p>
                                </div>
                              </div>
                              <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                  <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                  >
                                    Role
                                  </label>
                                  <p className="py-2 px-1">
                                    {user?.account.role}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <hr className="mt-6 border-b-1 border-blueGray-300" />

                            <h6 className="text-blueGray-400 text-sm mt-8 mb-6 font-bold uppercase">
                              Contact Information
                            </h6>
                            <div className="flex flex-wrap">
                              <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                  <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                  >
                                    Address
                                  </label>
                                  <p className="py-2 px-1">
                                    {user?.address}
                                  </p>
                                </div>
                              </div>
                              <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                  <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                  >
                                    Phone Number
                                  </label>
                                  <p className="py-2 px-1">
                                    {user?.phone_number}
                                  </p>
                                </div>
                              </div>
                              <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                  <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                  >
                                    Emergency Contact Fullname
                                  </label>
                                  <p className="p-3">
                                    {user?.emergency_contact_fullname}
                                  </p>
                                </div>
                              </div>
                              <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                  <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                  >
                                    Emergency Contact Phone Number
                                  </label>
                                  <p className="p-3">
                                    {
                                      user?.emergency_contact_phone_number
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </Fragment>
  );
};

export default ProfilePage;
