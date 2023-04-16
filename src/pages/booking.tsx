import React, { Fragment, useState } from 'react';
import { Banner } from '@/components';
import Layout from '@/layouts/Layout';
import { NextPage, GetServerSideProps } from 'next';
import { getFieldService } from '@/services/field.services';
import { IField } from '@/interfaces/field';
import { ISlots } from '@/interfaces/slot';
import { SlotsInitialValue } from '@/constants/slots';
import { CreateBookingInitialValue } from '@/constants/booking';
import { createBookingService } from '@/services/booking.services';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { IBooking } from '@/interfaces/booking';

interface Props {
    data: IField[];
}

const Booking: NextPage<Props> = ({ data }) => {
    const [booking, setBooking] = useState<IBooking>(CreateBookingInitialValue);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [slotsId, setSlotsId] = useState<string>('');
    const [slotsClick, setSlotsClick] = useState<boolean>(false);

    console.log(booking);

    const handleSlotsClick = (id: string): void => {
        setSlotsId(id);
        setSlotsClick(true);
    };

    const handleRadioChange = (id: string): void => {
        setSelectedId(id);
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const inputDate: string = event.target.value;
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
            setBooking({ ...booking, slot: { ...booking.slot, date: formattedDate } });
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
            await createBookingService(booking);
            toast.success('Booking created successfully');
            setBooking(CreateBookingInitialValue);
            setSelectedDate('');
        } catch (err) {
            const errorMessage = (err as AxiosError)?.message;
            toast.error(errorMessage);
        }
    };

    return (
        <Fragment>
            <Layout>
                <div className='w-screen mt-5'>
                    <Banner />
                    <div className='mx-auto grid max-w-screen-lg px-6 pb-20'>
                        <div>
                            <p className='text-xl font-bold text-blue-900'>Select a service</p>
                            <div
                                className='mt-4 grid max-w-3xl gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3'
                            >
                                {data.map((field: IField) => (
                                    <div className='relative' key={field._Field__id}>
                                        <input
                                            className='peer hidden'
                                            id={field._Field__id}
                                            type='radio'
                                            name='radio'
                                            checked={selectedId === field._Field__id}
                                            onChange={() => { handleRadioChange(field._Field__id), setBooking({ ...booking, field_id: field._Field__id }) }}
                                        />
                                        <span
                                            className='absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-blue-400'
                                        ></span>

                                        <label
                                            className='flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-blue-600 peer-checked:text-white'
                                            htmlFor={field._Field__id}
                                        >
                                            <span className='mt-2 font-medium'>{field._Field__name}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className='my-8 text-xl font-bold text-blue-900'>Select a date</p>
                            <div>
                                <div className='relative mt-4 w-56'>
                                    <input
                                        className='peer block w-full px-4 pl-14 py-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500'
                                        type='date'
                                        name='dateInput'
                                        value={selectedDate}
                                        onChange={(e) => handleDateChange(e)}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                            </div>
                        </div>

                        {booking.slot.date ? (
                            <div>
                                <p className='my-8 text-xl font-bold text-blue-900'>
                                    Select a time
                                </p>
                                <div className='mt-4 grid grid-cols-6 gap-2'>
                                    {SlotsInitialValue.map((Slots: ISlots) => (
                                        <>
                                            {slotsClick && slotsId === Slots.id ? (
                                                <button
                                                    className='rounded-lg bg-blue-900 px-2 py-2 font-medium text-white active:scale-95'
                                                    onClick={() => { handleSlotsClick(Slots.id); handleTimeChange(Slots.start_time, Slots.end_time); }}
                                                    key={Slots.id}
                                                >{Slots.start_time} - {Slots.end_time}</button >
                                            ) : (
                                                <button
                                                    className='rounded-lg bg-blue-100 px-2 py-2 font-medium text-blue-900 active:scale-95'
                                                    onClick={() => { handleSlotsClick(Slots.id); handleTimeChange(Slots.start_time, Slots.end_time); }}
                                                    key={Slots.id}
                                                >{Slots.start_time} - {Slots.end_time}</button>
                                            )}
                                        </>
                                    ))}
                                </div>
                            </div>
                        ) : null}

                        <button
                            className='mt-8 w-56 rounded-full border-8 border-blue-500 bg-blue-600 px-10 py-4 text-lg font-bold text-white transition hover:translate-y-1'
                            onClick={() => handleCreateBooking(booking)}
                        >Book Now</button>
                    </div>
                </div>
            </Layout>
        </Fragment >
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const data = await getFieldService();
        if (data) {
            return {
                props: {
                    data
                }
            }
        } else {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            };
        }
    } catch (err) {
        console.log(err);
        return {
            props: {}
        }
    }
}

export default Booking