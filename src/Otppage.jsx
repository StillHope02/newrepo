// import { useState, useRef } from "react";

// export default function OTPVerify({ phone = "078****824", onBack }) {
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [show, setShow] = useState(false);
//   const inputs = useRef([]);

//   const handleChange = (val, idx) => {
//     if (!/^\d?$/.test(val)) return;
//     const newOtp = [...otp];
//     newOtp[idx] = val;
//     setOtp(newOtp);
//     if (val && idx < 3) inputs.current[idx + 1]?.focus();
//   };

//   const handleKeyDown = (e, idx) => {
//     if (e.key === "Backspace" && !otp[idx] && idx > 0) {
//       inputs.current[idx - 1]?.focus();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       {/* Status Bar */}
//       <div className="bg-yellow-400 h-8 w-full" />

//       {/* Header */}
//       <div className="flex items-center px-4 py-4 border-b border-gray-200">
//         <button onClick={onBack} className="text-yellow-500 text-2xl font-bold mr-4">
//           ‹
//         </button>
//         <span className="text-lg font-bold text-gray-900">Register</span>
//       </div>

//       {/* Content */}
//       <div className="flex flex-col px-5 pt-8 flex-1">
//         <h2 className="text-xl font-black text-gray-900 mb-2">
//           Confirm your cellphone number
//         </h2>
//         <p className="text-sm text-gray-500 leading-relaxed mb-8">
//           We will send an SMS with a One Time Pin (OTP) within the next 3 minutes to{" "}
//           <span className="text-gray-700 font-medium">{phone}</span>
//         </p>

//         {/* OTP Label */}
//         <p className="text-sm font-bold text-gray-400 mb-3">
//           Please enter the OTP you received
//         </p>

//         {/* OTP Inputs + SHOW */}
//         <div className="flex items-center gap-3 mb-10">
//           {otp.map((digit, idx) => (
//             <input
//               key={idx}
//               ref={(el) => (inputs.current[idx] = el)}
//               type={show ? "text" : "password"}
//               maxLength={1}
//               value={digit}
//               onChange={(e) => handleChange(e.target.value, idx)}
//               onKeyDown={(e) => handleKeyDown(e, idx)}
//               className="w-14 h-14 rounded-full border-2 border-gray-300 text-center text-xl font-bold text-gray-800 focus:outline-none focus:border-yellow-400 bg-white"
//             />
//           ))}
//           <button
//             onClick={() => setShow(!show)}
//             className="ml-2 text-sm font-bold text-gray-700 tracking-widest"
//           >
//             {show ? "HIDE" : "SHOW"}
//           </button>
//         </div>

//         {/* Verify Button */}
//         <button className="w-full bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-bold text-lg rounded-full py-4 mb-4 transition-colors shadow-sm">
//           Verify
//         </button>

//         {/* Resend OTP Button */}
//         <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-lg rounded-full py-4 transition-colors">
//           Resend OTP
//         </button>
//       </div>

//       {/* Bottom Nav */}
//       <div className="bg-white border-t border-gray-100 flex justify-around items-center py-3 px-10">
//         <span className="text-gray-400 text-lg">|||</span>
//         <div className="w-8 h-8 border-2 border-gray-400 rounded-md" />
//         <span className="text-gray-400 text-xl font-thin">‹</span>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function OTPVerify() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [show, setShow] = useState(false);
  const inputs = useRef([]);
  const navigate = useNavigate(); // ✅
  const location = useLocation();
  const phone = location.state?.phone || "078****824"; // ✅ Login se aaya phone

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (val && idx < 3) inputs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  const isComplete = otp.every((d) => d !== ""); // ✅ verify tab enable ho jab sab filled

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-yellow-400 h-8 w-full" />

      <div className="flex items-center px-4 py-4 border-b border-gray-200">
        <button
          onClick={() => navigate(-1)} // ✅ Wapas login pe
          className="text-yellow-500 text-2xl font-bold mr-4"
        >
          ‹
        </button>
        <span className="text-lg font-bold text-gray-900">Register</span>
      </div>

      <div className="flex flex-col px-5 pt-8 flex-1">
        <h2 className="text-xl font-black text-gray-900 mb-2">
          Confirm your cellphone number
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          We will send an SMS with a One Time Pin (OTP) within the next 3 minutes to{" "}
          <span className="text-gray-700 font-medium">{phone}</span>
        </p>

        <p className="text-sm font-bold text-gray-400 mb-3">
          Please enter the OTP you received
        </p>

        <div className="flex items-center gap-3 mb-10">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputs.current[idx] = el)}
              type={show ? "text" : "password"}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-14 h-14 rounded-full border-2 border-gray-300 text-center text-xl font-bold text-gray-800 focus:outline-none focus:border-yellow-400 bg-white"
            />
          ))}
          <button
            onClick={() => setShow(!show)}
            className="ml-2 text-sm font-bold text-gray-700 tracking-widest"
          >
            {show ? "HIDE" : "SHOW"}
          </button>
        </div>

        <button
          onClick={() => navigate("/pincode")} // ✅ PIN page pe jao
          disabled={!isComplete}
          className="w-full bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-bold text-lg rounded-full py-4 mb-4 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verify
        </button>

        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-lg rounded-full py-4 transition-colors">
          Resend OTP
        </button>
      </div>

      <div className="bg-white border-t border-gray-100 flex justify-around items-center py-3 px-10">
        <span className="text-gray-400 text-lg">|||</span>
        <div className="w-8 h-8 border-2 border-gray-400 rounded-md" />
        <span className="text-gray-400 text-xl font-thin">‹</span>
      </div>
    </div>
  );
}