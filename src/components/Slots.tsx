import { Fragment, useState } from 'react'
import { NextPage } from 'next';
import { slots } from '@/constants/slots';
import { ISlots } from '@/interfaces/slot';

const Slots: NextPage = () => {
    const [slotsId, setSlotsId] = useState<string>('');
    const [slotsClick, setSlotsClick] = useState<boolean>(false);

    const handleSlotsClick = (id: string) => {
        setSlotsId(id);
        setSlotsClick(true);
    }
    return (
        <Fragment>
            <div className='mt-4 grid grid-cols-6 gap-2'>
                {slots.map((slot: ISlots) => (
                    <>
                        {slotsClick && slotsId === slot.id ? (
                            <button
                                className='rounded-lg bg-emerald-900 px-2 py-2 font-medium text-white active:scale-95'
                                onClick={() => handleSlotsClick(slot.id)}
                                key={slot.id}
                            >{slot.time}</button>
                        ) : (
                            <button
                                className='rounded-lg bg-emerald-100 px-2 py-2 font-medium text-emerald-900 active:scale-95'
                                onClick={() => handleSlotsClick(slot.id)}
                                key={slot.id}
                            >{slot.time}</button>
                        )}
                    </>
                ))}
            </div>
        </Fragment>
    )
}

export default Slots