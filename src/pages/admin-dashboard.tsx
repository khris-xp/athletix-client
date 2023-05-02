import { Fragment } from "react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Layout from "@/layouts/Layout";
import { Error, Loading } from "@/components";
import { getBookingService, approveBookingService } from "@/services";
import { IBookingData } from "@/interfaces/booking";
import { toast } from "react-hot-toast";
import router from "next/router";
import { useAuth } from "@/context/auth";
import Link from "next/link";

interface Props {
  data: IBookingData[];
}

const AdminDashboard: NextPage<Props> = ({ data }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAdmin && !isAuthenticated) {
    return <Error title="401" />;
  }
  const handleApproveBooking = async (bookingId: string) => {
    try {
      await approveBookingService(bookingId);
      toast.success("Booking approved");
      setTimeout(() => {
        router.reload();
      }, 300);
    } catch (err) {
      toast.error("Failed to approve booking");
    }
  };
  return (
    <Fragment>
      <Layout title="Athletix | Admin Dashboard">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 mb-16">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Booking Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking User
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking Field
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking Slip
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((booking: IBookingData) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={booking.id}
                >
                  <td className="px-6 py-4">{booking.id}</td>
                  <td className="px-6 py-4" suppressHydrationWarning>
                    {new Date(booking.slot.date).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(
                      new Date(booking.slot.start_time).getTime() -
                        7 * 60 * 60 * 1000
                    ).toLocaleTimeString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    - {` `}
                    {new Date(
                      new Date(booking.slot.end_time).getTime() -
                        7 * 60 * 60 * 1000
                    ).toLocaleTimeString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4">{booking.customer.fullname}</td>
                  <td className="px-6 py-4">{booking.field.name}</td>
                  <td className="px-6 py-4">{booking.payment.amount} Bath</td>
                  <td className="px-6 py-4">
                    {booking.payment.slip_image !== null ? (
                      <Link
                        href={`${process.env.NEXT_PUBLIC_GET_API}${booking.payment.slip_image}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >{`${process.env.NEXT_PUBLIC_GET_API}/${booking.payment.slip_image}`}</Link>
                    ) : (
                      "No Slip"
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {booking.status === "pending" ? (
                      <div className="flex items-center uppercase">
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-2"></div>
                        {booking.status}
                      </div>
                    ) : (
                      <div className="flex items-center uppercase">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                        {booking.status}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-700 font-semibold hover:underline"
                      onClick={() => handleApproveBooking(booking.id)}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const data = await getBookingService(context);
    if (data) {
      return {
        props: {
          data,
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

export default AdminDashboard;
