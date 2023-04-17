import { Fragment } from "react";
import { NextPage } from "next";
import Layout from "@/layouts/Layout";
import { GetServerSidePropsContext } from "next";
import { getUserHistoryService } from "@/services/user.services";
import { IHistory } from "@/interfaces/history";

interface Props {
  historyData: IHistory[];
}

const HistoryPage: NextPage<Props> = ({ historyData }) => {
  return (
    <Fragment>
      <Layout>
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

                  <table className="w-full text-sm text-gray-800 text-center">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Booking Id
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
                          Booking Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {historyData.map((history: IHistory) => (
                        <tr
                          className="bg-white border-b hover:bg-gray-50 text-center"
                          key={history._Booking__id}
                        >
                          <td className="px-6 py-4">{history._Booking__id}</td>
                          <td className="px-6 py-4">
                            {history._Booking__equipments.length === 0
                              ? "No Equipment"
                              : history._Booking__equipments}
                          </td>
                          <td className="px-6 py-4">
                            {history._Booking__payment._Payment__amount} Bath
                          </td>
                          <td className="px-6 py-4" suppressHydrationWarning>
                            {new Date(
                              history._Booking__slot._SlotDate__date
                            ).toLocaleDateString(undefined, {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-6 py-4">
                            {new Date(
                              new Date(
                                history._Booking__slot._Slot__start_time
                              ).getTime() -
                                7 * 60 * 60 * 1000
                            ).toLocaleTimeString("th-TH", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            - {` `}
                            {new Date(
                              new Date(
                                history._Booking__slot._Slot__end_time
                              ).getTime() -
                                7 * 60 * 60 * 1000
                            ).toLocaleTimeString("th-TH", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="px-6 py-4">
                            {history._Booking__status}
                          </td>
                          <td className="px-6 py-4">
                            {history._Booking__payment._Payment__is_payed
                              ? "Paid"
                              : "Not Paid"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export const getServerSideProps = async (
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
