import React, { useContext, useState, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,

      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } });
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="sm:w-64">
          <img
            className="w-full rounded-xl shadow-md object-cover aspect-square"
            src={profileData.image}
            alt="Doctor"
          />
        </div>

        <div className="flex-1 border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800">{profileData.name}</h2>
          <div className="flex items-center gap-3 mt-2 text-gray-600">
            <p>{profileData.degree} - {profileData.speciality}</p>
            <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
              {profileData.experience}
            </span>
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-semibold text-gray-700">About:</h3>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed max-w-2xl">
              {profileData.about}
            </p>
          </div>

          <div className="mt-5">
            <p className="text-gray-700 font-medium">
              Appointment Fee:{' '}
              <span className="text-gray-900">
                {currency}
                {isEdit ? (
                  <input
                    type="number"
                    className="ml-2 px-2 py-1 border rounded-md text-sm"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>
          </div>

          <div className="mt-5 text-gray-700">
            <p className="font-medium mb-1">Address:</p>
            <div className="text-sm space-y-1">
              {isEdit ? (
                <>
                  <input
                    type="text"
                    className="block w-full px-2 py-1 border rounded-md"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={profileData.address.line1}
                  />
                  <input
                    type="text"
                    className="block w-full px-2 py-1 border rounded-md"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={profileData.address.line2}
                  />
                </>
              ) : (
                <>
                  <p>{profileData.address.line1}</p>
                  <p>{profileData.address.line2}</p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-5">
            <input
              type="checkbox"
              id="available"
              checked={profileData.available}
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
            />
            <label htmlFor="available" className="text-gray-700 text-sm">
              Available
            </label>
          </div>

          <div className="mt-6">
            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-4 py-1 border border-blue-500 text-blue-500 text-sm rounded-full hover:bg-blue-500 hover:text-white transition-all"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 border border-blue-500 text-blue-500 text-sm rounded-full hover:bg-blue-500 hover:text-white transition-all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile