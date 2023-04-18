import React, { Fragment, useState } from "react";
import { Banner } from "@/components";
import Layout from "@/layouts/Layout";
import { NextPage, GetServerSideProps } from "next";
import { getFieldService } from "@/services/field.services";
import { IField } from "@/interfaces/field";
import { ISlots, ISlotTime } from "@/interfaces/slot";
import { SlotsInitialValue } from "@/constants/slots";
import { CreateBookingInitialValue } from "@/constants/booking";
import {
  createBookingService,
  createPromptpayPayment,
  createCashPayment,
} from "@/services/booking.services";
import { uploadImageService } from "@/services/file.services";
import { checkSlotBookingService } from "@/services/slot.services";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
import { IBooking, IBookingData } from "@/interfaces/booking";
import { ISearchSlots } from "@/interfaces/search";
import Image from "next/image";
import router from "next/router";
import { getEquipmentService } from "@/services/equipment.services";
import { IEquipment } from "@/interfaces/equipment";
import { useAuth } from "@/context/auth";

interface Props {
  data: IField[];
  equipmentData: any;
}

const BookingPage: NextPage<Props> = ({ data, equipmentData }) => {
  const [booking, setBooking] = useState<IBooking>(CreateBookingInitialValue);
  const [selectedId, setSelectedId] = useState<string>("");
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [promptPayData, setPromptPayData] = useState<string>("");;
  const [slotsId, setSlotsId] = useState<string>("");
  const [bookingData, setBookingData] = useState<IBookingData | null>(null);
  const [slotsClick, setSlotsClick] = useState<boolean>(false);
  const [SlotCheck, setSlotCheck] = useState<ISlotTime[]>([]);
  const [equipmentModal, setEquipmentModal] = useState<boolean>(false);

  const { isAuthenticated } = useAuth();

  console.log(booking.equipments)

  const handleSlotsClick = (id: string): void => {
    setSlotsId(id);
    setSlotsClick(true);

  };

  const handleRadioChange = (id: string) => {
    setSelectedId(id);
    setBooking({
      ...booking,
      slot: { ...booking.slot, date: booking.slot.date },
    });
    handSlotCheck({
      field_id: id,
      date: booking.slot.date,
    } as ISearchSlots);
    setSelectedId(id);

    //console.log(selectedId);
  };

  const handSlotCheck = async (slotData: ISearchSlots) => {
    try {
      console.log(slotData);
      const BookingCheck = await checkSlotBookingService(slotData);
      setSlotCheck(BookingCheck);
    } catch (err) {
      console.log(err);
    }
  };
  const handleConvertTime = (time: string) => {
    const match = time.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):/);
    if (match) {
      const hours = match[4];
      const minutes = match[5];
      const timeStr = `${hours}:${minutes}`;
      return timeStr
    }
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const inputDate: string = event.target.value;

    handSlotCheck({
      field_id: selectedId,
      date: inputDate + "T00:00:00.000Z",
    } as ISearchSlots);

    setSelectedDate(inputDate);
    const dateRegex: RegExp = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = inputDate.match(dateRegex);

    if (match) {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const day = parseInt(match[3], 10);
      const date: Date = new Date(year, month, day);
      date.setUTCHours(0, 0, 0, 0);
      date.setDate(date.getUTCDate() + 1);
      const formattedDate: string = date.toISOString();
      setBooking({
        ...booking,
        slot: { ...booking.slot, date: formattedDate },
      });
    } else {
      console.error("Invalid date format");
    }
  };


  const handleTimeChange = (startTime: string, endTime: string) => {
    const updatedBooking = { ...booking };

    const timeRegex = /^([0-9]{2}):([0-9]{2})$/;

    const startTimeMatch = startTime.match(timeRegex);
    if (!startTimeMatch) {
      console.error("Invalid startTime:", startTime);
      return;
    }

    const hours = parseInt(startTimeMatch[1]);
    const minutes = parseInt(startTimeMatch[2]);

    if (!selectedDate) {
      toast.error("Please Select Date Before Select time");
      return;
    }

    const date = new Date(selectedDate);
    if (isNaN(date.getTime())) {
      toast.error("Invalid selectedDate");
      return;
    }

    date.setUTCHours(hours, minutes, 0, 0);
    const formattedStartTime = date.toISOString();

    const endTimeMatch = endTime.match(timeRegex);
    if (!endTimeMatch) {
      console.error("Invalid endTime:", endTime);
      return;
    }

    const endHours = parseInt(endTimeMatch[1]);
    const endMinutes = parseInt(endTimeMatch[2]);

    date.setUTCHours(endHours, endMinutes, 0, 0);
    const formattedEndTime = date.toISOString();

    updatedBooking.slot.start_time = formattedStartTime;
    updatedBooking.slot.end_time = formattedEndTime;
    setBooking(updatedBooking);
  };

  const handleCreateBooking = async (booking: IBooking) => {
    try {
      const bookingData = await createBookingService(booking);
      setBookingData(bookingData);
      setPaymentModal(true);
      toast.success("Booking created successfully");
      setBooking(CreateBookingInitialValue);
      setSelectedDate("");
    } catch (err) {
      const errorMessage = (err as AxiosError)?.message;
      toast.error(errorMessage);
    }
  };

  const handlePromptPayMethod = async (): Promise<void> => {
    try {
      await createPromptpayPayment(
        bookingData?.id,
        bookingData?.payment?.id,
        promptPayData
      );
      toast.success("Payment created successfully");
      setPaymentModal(false);
      router.push("/history");
    } catch (err) {
      toast.error("Payment created failed");
    }
  };

  const handleCashMethod = async (): Promise<void> => {
    try {
      await createCashPayment(
        bookingData?.id,
        bookingData?.payment.amount
      );
      toast.success("Payment created successfully");
      setPaymentModal(false);
      router.push("/history");
    } catch (err) {
      toast.error("Payment created failed");
    }
  };
  return (
    <Fragment>
      <Layout title="Athletix | Booking">
        <div className="w-screen mt-5">
          <Banner />
          <div className="mx-auto grid max-w-screen-lg px-6 pb-20">
            <div>
              <p className="text-xl font-bold text-blue-900">
                Select a field
              </p>
              <div className="mt-4 grid max-w-3xl gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
                {data.map((field: IField) => (

                  <div className="relative" key={field.id}>
                    <input
                      className="peer hidden"
                      id={field.id}
                      type="radio"
                      name="radio"
                      checked={selectedId === field.id}
                      onChange={() => {
                        handleRadioChange(field.id),
                          setBooking({
                            ...booking,
                            field_id: field.id,
                            slot: { ...booking.slot, date: booking.slot.date },
                          });
                      }}
                    />
                    <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-blue-400"></span>

                    <label
                      className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-blue-600 peer-checked:text-white"
                      htmlFor={field.id}
                    >
                      <span className="mt-2 font-medium">
                        {field.name}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="my-8 text-xl font-bold text-blue-900">
                Select a date
              </p>
              <div>
                <div className="relative mt-4 w-56">
                  <input
                    className="peer block w-full px-4 pl-14 py-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 cursor-pointer"
                    type="date"
                    name="dateInput"
                    value={selectedDate}
                    onChange={(e) => handleDateChange(e)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
            </div>
            {booking.slot.date
              ? (console.log(booking),
                (
                  <div>
                    <p className="my-8 text-xl font-bold text-blue-900">
                      Select a time
                    </p>
                    <div className="mt-4 grid grid-cols-6 gap-2">
                      {SlotsInitialValue.map((Slots: ISlots) => (
                        <>
                          {slotsClick && slotsId === Slots.id ? (
                            <button
                              className={`rounded-lg ${SlotCheck.some(
                                (slot) =>
                                  handleConvertTime(slot.start_time) === Slots.start_time &&
                                  handleConvertTime(slot.end_time) === Slots.end_time
                              )
                                ? "bg-red-500"
                                : "bg-blue-900"
                                } px-2 py-2 font-medium text-white active:scale-95`}
                              onClick={() => {
                                handleSlotsClick(Slots.id);
                                handleTimeChange(
                                  Slots.start_time,
                                  Slots.end_time
                                );
                              }}
                              key={Slots.id}
                            >
                              {Slots.start_time} - {Slots.end_time}
                            </button>
                          ) : (
                            <button
                              className={`rounded-lg ${SlotCheck.some(
                                (slot) =>
                                  handleConvertTime(slot.start_time) === Slots.start_time &&
                                  handleConvertTime(slot.end_time) === Slots.end_time
                              )
                                ? "bg-red-500"
                                : "bg-blue-100"
                                } px-2 py-2 font-medium ${SlotCheck.some(
                                  (slot) =>
                                    handleConvertTime(slot.start_time) === Slots.start_time &&
                                    handleConvertTime(slot.end_time) === Slots.end_time
                                )
                                  ? "text-white"
                                  : "text-blue-900"
                                } active:scale-95`}
                              onClick={() => {
                                handleSlotsClick(Slots.id);
                                handleTimeChange(
                                  Slots.start_time,
                                  Slots.end_time
                                );
                                setEquipmentModal(true);
                              }}
                              key={Slots.id}
                            >
                              {Slots.start_time} - {Slots.end_time}
                            </button>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                ))
              : null}
            {isAuthenticated && booking.slot.date != "" && booking.field_id != "" ? (
              <button
                className="mt-8 w-56 rounded-full border-8 border-blue-500 bg-blue-600 px-10 py-4 text-lg font-bold text-white transition hover:translate-y-1"
                onClick={() => handleCreateBooking(booking)}
              >
                Book Now
              </button>) : <button
                className="mt-8 w-56 rounded-full border-8 border-gray-500 bg-gray-600 px-10 py-4 text-lg font-bold text-white"
                onClick={() => handleCreateBooking(booking)}
                disabled
              >
              Book Now

            </button>
            }


          </div>
        </div>
        <div
          className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${equipmentModal ? "flex" : "hidden"
            } items-center justify-center bg-opacity-50 bg-black`}
        >
          <div className="relative w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm p-4 ml-auto flex justify-end"
                onClick={() => setEquipmentModal(false)}
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
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg pb-2 px-10">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3"></th>
                      <th scope="col" className="px-6 py-3">
                        Equipment
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipmentData.map((equipment: IEquipment) => (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={equipment.id}>
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white uppercase">
                          {equipment.name}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <button className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                              <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                            </button>
                            <div>
                              <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required />
                            </div>
                            <button className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                              <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {equipment.price_per_unit} Bath
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

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
                        onClick={() => setPaymentMethod("promptpay")}
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
                        onClick={() => setPaymentMethod("cash")}
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
                            setPromptPayData(name.filename as string)
                          }
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
                        {bookingData?.payment?.amount} is
                        Bath
                      </label>
                    </div>
                  </div>
                )}
                <div>
                  {paymentMethod === "promptpay" ? (
                    <button
                      className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                      onClick={() => handlePromptPayMethod()}
                    >
                      <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
                    </button>
                  ) : (
                    <button
                      className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                      onClick={() => handleCashMethod()}
                    >
                      <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const data = await getFieldService();
    const equipmentData = await getEquipmentService();
    if (data && equipmentData) {
      return {
        props: {
          data, equipmentData
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
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
};

export default BookingPage;