
import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {
  const { aToken, appointments = [], getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl mx-auto p-5'>
      <p className='mb-4 text-xl font-semibold'>All Appointments</p>

      <div className='bg-white border border-gray-300 rounded-lg text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto'>

        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Table Rows */}
        {appointments.length > 0 ? appointments.map((item, index) => (
          <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] itmes=center text-gray-500 py-3 px-6 hover:bg-gray-50'>

            <p className='max-sm:hidden '>{index + 1}</p>

            {/* Patient Info */}
            <div className='flex items-center gap-2'>
              <img
                src={item.userData.image || 'https://via.placeholder.com/40'}
                alt={item.userData.name || 'Patient'}
                className='w-8 rounded-full'
              />
              <p>{item?.userData?.name || 'N/A'}</p>
            </div>

            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img
                src={item.docData.image || 'https://via.placeholder.com/40'}
                alt={item.docData.name || 'Doctor'}
                className='w-8 rounded-full bg-gray-200'
              />
              <p>{item?.docData?.name || 'N/A'}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {item.cancelled
              ? <p className='text-red-400 text-xs font-medium '>Cancelled</p>
              : item.isCompleted
                ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
            }




          </div>
        )) : (
          <div className='p-4 text-center text-gray-500'>
            No appointments found.
          </div>
        )}
      </div>
    </div>
  )
}

export default AllAppointments     