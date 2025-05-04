import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
    const { speciality } = useParams();
    const decodedSpeciality = decodeURIComponent(speciality || '');
    const [filterDoc, setFilterDoc] = useState([]);
    const [showFilter, setShowFilter] = useState(false)
    const navigate = useNavigate();

    const { doctors } = useContext(AppContext);

    const applyFilter = () => {
        if (decodedSpeciality) {
            setFilterDoc(doctors.filter(doc => doc.speciality.toLowerCase() === decodedSpeciality.toLowerCase()));
        } else {
            setFilterDoc(doctors);
        }
    };

    useEffect(() => {
        applyFilter();
    }, [doctors, decodedSpeciality]);

    return (
        <div>
            <p className='text-gray-600'>Browse through the doctors specialist.</p>
            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
                <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
                <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
                    <p onClick={() => decodedSpeciality === 'General Physician' ? navigate('/doctors') : navigate('/doctors/General Physician')}
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${decodedSpeciality === "General Physician" ? "bg-indigo-100 text-black" : ""}`}>
                        General Physician
                    </p>
                    <p onClick={() => decodedSpeciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${decodedSpeciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>
                        Gynecologist
                    </p>
                    <p onClick={() => decodedSpeciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${decodedSpeciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>
                        Dermatologist
                    </p>
                    <p onClick={() => decodedSpeciality === 'Pediatrician' ? navigate('/doctors') : navigate('/doctors/Pediatrician')}
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${decodedSpeciality === "Pediatrician" ? "bg-indigo-100 text-black" : ""}`}>
                        Pediatrician
                    </p>
                    <p onClick={() => decodedSpeciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${decodedSpeciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>
                        Neurologist
                    </p>
                    <p onClick={() => decodedSpeciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${decodedSpeciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>
                        Gastroenterologist
                    </p>
                </div>
                <div className='w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 gap-y-6'>
                    {
                        filterDoc.map((item, index) => (
                            <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                                <img className='bg-blue-50' src={item.image} alt="" />
                                <div className='p-4'>
                                    <div className="flex items-center gap-2">
                                        <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></p>
                                        <p className={`text-sm font-medium ${item.available ? 'text-green-600' : 'text-red-600'}`}>
                                            {item.available ? 'Available' : 'Not available'}
                                        </p>
                                    </div>
                                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Doctors;
