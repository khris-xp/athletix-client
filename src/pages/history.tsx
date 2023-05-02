import { Fragment, useState } from "react";
import { NextPage } from "next";
import Layout from "@/layouts/Layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getUserHistoryService } from "@/services/user.services";
import { IHistory } from "@/interfaces/history";
import { Loading, Error } from "@/components";
import { useAuth } from "@/context/auth";
import Image from "next/image";
import {
  approveBookingService,
  cancelBookingService,
  createCashPayment,
  createPromptpayPayment,
} from "@/services/booking.services";
import { toast } from "react-hot-toast";
import router from "next/router";

interface Props {
  historyData: IHistory[];
}

const HistoryPage: NextPage<Props> = ({ historyData }) => {
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [promptPayData, setPromptPayData] = useState<string>("");
  const { isAuthenticated, isCustomer, isLoading, isFrontDesk } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isCustomer && !isAuthenticated) {
    return <Error title="401" />;
  }

  const handlePaymentModal = (): void => {
    setPaymentModal(true);
  };

  const handlePromptPayMethod = async (
    booking_id: string,
    payment_id: string
  ): Promise<void> => {
    try {
      await createPromptpayPayment(booking_id, payment_id, promptPayData);
      toast.success("Payment created successfully");
      setPaymentModal(false);
      router.push("/history");
    } catch (err) {
      toast.error("Payment created failed");
    }
  };

  const handleCashMethod = async (
    booking_id: string,
    payment_amount: number
  ): Promise<void> => {
    try {
      await createCashPayment(booking_id, payment_amount);
      toast.success("Payment created successfully");
      setPaymentModal(false);
      router.push("/history");
    } catch (err) {
      toast.error("Payment created failed");
    }
  };

  const handleDeleteBooking = async (booking_id: string): Promise<void> => {
    try {
      await cancelBookingService(booking_id);
      toast.success("Booking deleted successfully");
      router.push("/history");
    } catch (err) {
      toast.error("Booking deleted failed");
    }
  };

  const handleApproveBooking = async (booking_id: string): Promise<void> => {
    try {
      await approveBookingService(booking_id);
      toast.success("Booking approved successfully");
      router.push("/history");
    } catch (err) {
      toast.error("Booking approved failed");
    }
  };

  return (
    <Fragment>
      <Layout title="Athletix | History">
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:pb-24 lg:px-8">
            <div className="max-w-xl">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Booking history
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Check the status of recent bookings
              </p>
            </div>
            <div className="mt-16">
              <h2 className="sr-only">Your Booking</h2>

              <div className="space-y-20">
                <div>
                  <h3 className="sr-only">
                    Order placed on <time>January 22, 2021</time>
                  </h3>
                  <div className="w-full overflow-x-auto">
                    <table className="table-auto divide-y">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Booking Status
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Booking Id
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Booking Field
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Booking Equipment
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Booking Amount
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Booking Date
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Booking Time
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Payment Paid
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Action
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {historyData.map((history: IHistory) => (
                          <Fragment key={history.id}>
                            <tr className="bg-white border-b hover:bg-gray-50 text-center">
                              <td className="px-6 py-4">
                                {history.status === "pending" ? (
                                  <div className="flex items-center uppercase">
                                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-2"></div>
                                    {history.status}
                                  </div>
                                ) : (
                                  <div className="flex items-center uppercase">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                    {history.status}
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4">{history.id}</td>
                              <td className="px-6 py-4">{history.field.name}</td>
                              <td className="px-10 py-4">
                                {history.equipments.length === 0
                                  ? "No Equipment"
                                  : history.equipments.map((equipment) => (
                                    <div key={equipment.id} className="w-full">
                                      {equipment.name} {equipment.quantity}{" "}
                                      piece
                                    </div>
                                  ))}
                              </td>
                              <td className="px-6 py-4">
                                {history.payment.amount} Bath
                              </td>
                              <td className="px-6 py-4" suppressHydrationWarning>
                                {new Date(history.slot.date).toLocaleDateString(
                                  undefined,
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </td>
                              <td className="px-6 py-4">
                                {new Date(
                                  new Date(history.slot.start_time).getTime() -
                                  7 * 60 * 60 * 1000
                                ).toLocaleTimeString("th-TH", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}{" "}
                                - {` `}
                                {new Date(
                                  new Date(history.slot.end_time).getTime() -
                                  7 * 60 * 60 * 1000
                                ).toLocaleTimeString("th-TH", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </td>
                              <td className="px-6 py-4">
                                {history.payment.is_payed ? "Paid" : "Not Paid"}
                              </td>
                              {!history.payment.is_payed ? (
                                <td className="px-6 py-4">
                                  <button
                                    className="text-blue-600 hover:underline font-semibold"
                                    onClick={() => handlePaymentModal()}
                                  >
                                    Paid
                                  </button>
                                </td>
                              ) : (
                                <td className="px-6 py-4">
                                  <p className="text-green-600 font-semibold">
                                    Already Paid
                                  </p>
                                </td>
                              )}
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => handleDeleteBooking(history.id)}
                                  className="text-red-600 font-semibold hover:underline hover:text-red-700"
                                >
                                  Cancel
                                </button>
                                {isFrontDesk && (
                                  <button
                                    onClick={() =>
                                      handleApproveBooking(history.id)
                                    }
                                    className="text-yellow-600 font-semibold"
                                  >
                                    Approve
                                  </button>
                                )}
                              </td>
                            </tr>
                            <div>
                              <div
                                className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${paymentModal ? "flex" : "hidden"
                                  } items-center justify-center bg-opacity-50 bg-black`}
                              >
                                <div className="relative w-full max-w-2xl max-h-full">
                                  <div className="relative bg-white rounded-lg shadow">
                                    <button
                                      type="button"
                                      className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm p-4 ml-auto flex justify-end"
                                      onClick={() => setPaymentModal(false)}
                                    >
                                      <svg
                                        aria-hidden="true"
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clipRule="evenodd"
                                        ></path>
                                      </svg>
                                    </button>
                                    <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700">
                                      <div className="w-full pt-1 pb-5">
                                        <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-24 mx-auto shadow-lg flex justify-center items-center">
                                          <i className="mdi mdi-credit-card-outline text-3xl"></i>
                                        </div>
                                      </div>
                                      <div className="mb-10">
                                        <h1 className="text-center font-bold text-xl uppercase">
                                          Secure payment info
                                        </h1>
                                      </div>
                                      <div className="mb-3 flex -mx-2">
                                        <div className="px-2">
                                          <label
                                            htmlFor="type1"
                                            className="flex items-center cursor-pointer"
                                          >
                                            <input
                                              type="radio"
                                              className="form-radio h-5 w-5 text-indigo-500"
                                              name="type"
                                              id="type1"
                                              onClick={() =>
                                                setPaymentMethod("promptpay")
                                              }
                                            />
                                            <Image
                                              src="https://www.ceochannels.com/wp-content/uploads/2017/10/PromptPay.jpg"
                                              alt="payment-image"
                                              width={32}
                                              height={32}
                                              className="ml-3"
                                            />
                                          </label>
                                        </div>
                                        <div className="px-2">
                                          <label
                                            htmlFor="type2"
                                            className="flex items-center cursor-pointer"
                                          >
                                            <input
                                              type="radio"
                                              className="form-radio h-5 w-5 text-indigo-500"
                                              name="type"
                                              id="type2"
                                              onClick={() =>
                                                setPaymentMethod("cash")
                                              }
                                            />
                                            <Image
                                              src="https://cdn-icons-png.flaticon.com/512/2371/2371970.png"
                                              alt="payment-image"
                                              height={32}
                                              width={32}
                                              className="ml-3"
                                            />
                                          </label>
                                        </div>
                                      </div>
                                      {paymentMethod === "promptpay" ? (
                                        <div className="mb-3 -mx-2 flex items-end">
                                          <div className="px-2 w-full">
                                            <label className="font-bold text-sm mb-2 ml-1">
                                              Your Promptpay Slip
                                            </label>
                                            <div>
                                              <input
                                                type="text"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-4"
                                                placeholder="Your Slip URL"
                                                required
                                                onChange={(e) =>
                                                  setPromptPayData(e.target.value)
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="mb-3 -mx-2 flex items-end">
                                          <div className="px-2 w-full">
                                            <label className="font-bold text-sm mb-2 ml-1">
                                              Your Payment Amount{" "}
                                              {history.payment.amount} is Bath
                                            </label>
                                          </div>
                                        </div>
                                      )}
                                      <div>
                                        {paymentMethod === "promptpay" ? (
                                          <button
                                            className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                                            onClick={() =>
                                              handlePromptPayMethod(
                                                history?.id,
                                                history.payment.slip_image
                                              )
                                            }
                                          >
                                            <i className="mdi mdi-lock-outline mr-1"></i>{" "}
                                            PAY NOW
                                          </button>
                                        ) : (
                                          <button
                                            className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                                            onClick={() =>
                                              handleCashMethod(
                                                history.id,
                                                history.payment.amount
                                              )
                                            }
                                          >
                                            <i className="mdi mdi-lock-outline mr-1"></i>{" "}
                                            PAY NOW
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const historyData = await getUserHistoryService(context);
    if (historyData) {
      return {
        props: {
          historyData,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/login",
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

export default HistoryPage;
