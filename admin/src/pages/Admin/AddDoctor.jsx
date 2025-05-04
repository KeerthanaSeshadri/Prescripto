import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error('Image not selected');
      }

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: { aToken },
      });

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName('');
        setPassword('');
        setEmail('');
        setAddress1('');
        setAddress2('');
        setDegree('');
        setAbout('');
        setFees('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="p-6 md:p-10 w-full">
      <p className="mb-6 text-2xl font-semibold text-gray-800">Add Doctor</p>

      <div className="bg-white px-6 md:px-12 py-10 border rounded-lg w-full max-w-5xl max-h-[80vh] overflow-y-scroll shadow-sm">
        {/* Upload Section */}
        <div className="flex items-center gap-6 mb-10 text-gray-700">
          <label htmlFor="doc-img">
            <img
              className="w-20 h-20 object-cover bg-gray-100 rounded-full cursor-pointer border"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
            />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p className="text-sm">Upload doctor <br /> picture</p>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col lg:flex-row gap-10 text-gray-700">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <label>Doctor Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                required
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Doctor Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                required
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Doctor Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Experience</label>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className="border p-2 rounded">
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={`${i + 1} Year`}>
                    {i + 1} Year
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label>Fees</label>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                type="number"
                placeholder="Fees"
                required
                className="border p-2 rounded"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <label>Speciality</label>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="border p-2 rounded">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label>Education</label>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                type="text"
                placeholder="Education"
                required
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Address</label>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                type="text"
                placeholder="Address 1"
                required
                className="border p-2 rounded"
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                type="text"
                placeholder="Address 2"
                required
                className="border p-2 rounded"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8 flex flex-col gap-2">
          <label>About Doctor</label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            placeholder="Write about the doctor..."
            rows={5}
            required
            className="border p-2 rounded"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-10">
          <button type="submit" className="bg-[#5f6FFF] hover:bg-[#4e59e6] text-white py-2 px-6 rounded shadow">
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
