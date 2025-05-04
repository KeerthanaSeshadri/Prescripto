import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800 px-4"
      id="speciality"
    >
      <h1 className="text-3xl font-medium text-center">Find By Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>

      {/* Scrollable list horizontally */}
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-x-auto no-scrollbar">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => window.scrollTo(0, 0)}
            key={index}
            to={`/doctors/${encodeURIComponent(item.speciality)}`}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-300"
          >
            <img className="w-16 sm:w-24 mb-2" src={item.image} alt={item.speciality} />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
