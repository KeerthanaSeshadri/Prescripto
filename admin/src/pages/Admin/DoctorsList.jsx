import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  const handleAvailabilityToggle = async (docId) => {
    await changeAvailability(docId);
    toast.success('Availability updated!');
  };

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5'>
        {doctors.map((item, index) => (
          <div
            key={index}
            className='border border-indigo-200 rounded-xl overflow-hidden cursor-pointer group h-72 flex flex-col shadow-sm hover:shadow-md transition'
          >
            <img
              src={item.image}
              alt={item.name}
              className='w-full h-36 object-cover'
            />
            <div className='p-3 flex flex-col justify-between flex-1 group-hover:bg-blue-200 transition-all duration-300'>
              <div>
                <p className='font-semibold text-gray-800 group-hover:text-blue-700 transition'>
                  {item.name}
                </p>
                <p className='text-sm text-gray-600'>{item.speciality}</p>
              </div>
              <div className='flex items-center gap-2 mt-2'>
                <input
                  type="checkbox"
                  className="w-5 h-5 cursor-pointer accent-indigo-500"
                  checked={item.available}
                  onChange={() => handleAvailabilityToggle(item._id)}
                />
                <p className='text-sm'>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
