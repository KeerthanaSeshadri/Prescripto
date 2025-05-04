import validator from "validator";
import bcrypt, { compareSync } from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";


const addDoctor = async (req, res) => {
  try {
    console.log("Reached Add Doctor")
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;


    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      return res.json({ success: false, message: "Missing details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a stronger password (min 8 characters)",
      });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;


    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    console.log("Completed Add Doctor")
    res.json({ success: true, message: "Doctor added successfully!" });
  } catch (error) {
    console.error("Error in addDoctor:", error);
    res.json({ success: false, message: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    }
    else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error in loginAdmin:", error);
    res.json({ success: false, message: error.message });
  }
};

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password');
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message });
  }
};
// Change doctor availability
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const doctor = await doctorModel.findById(docId);

    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    doctor.available = !doctor.available;
    await doctor.save();

    res.json({ success: true, message: "Availability updated!" });
  } catch (error) {
    console.error("Error in changeAvailability:", error);
    res.json({ success: false, message: error.message });
  }
};

//api to get all appointments list

const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({})
    res.json({ success: true, appointments })

  } catch (error) {
    console.error("Error in changeAvailability:", error);
    res.json({ success: false, message: error.message });
  }

}

//api to cancel appointment

const appointmentCancel = async (req, res) => {
  try {

      const { appointmentId } = req.body

      const appointmentData = await appointmentModel.findById(appointmentId)

      //verify appointment user
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

      //releasing doctor slot

      const { docId, slotDate, slotTime } = appointmentData

      const doctorData = await doctorModel.findById(docId)

      let slots_booked = doctorData.slots_booked

      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

      await doctorModel.findByIdAndUpdate(docId, { slots_booked })

      res.json({ success: true, message: 'Appointment Cancelled' })

  } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
  }
}

//api to get dashboard data for admin panel

const adminDashboard = async (req,res) =>{
  try {
    const doctors=await doctorModel.find({})
    const users=await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {
      doctors:doctors.length,
      appointments:appointments.length,
      patients:users.length,
      latestAppointments:appointments.reverse().slice(0,5)

    }
    res.json({success:true,dashData})
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
}
}

export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin ,appointmentCancel,adminDashboard };