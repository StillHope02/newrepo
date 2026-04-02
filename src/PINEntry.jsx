// import { useState, useRef } from "react";

// export default function PINEntry({ onBack }) {
//   const [pin, setPin] = useState(["", "", "", ""]);
//   const inputs = useRef([]);

//   const handleChange = (val, idx) => {
//     if (!/^\d?$/.test(val)) return;
//     const newPin = [...pin];
//     newPin[idx] = val;
//     setPin(newPin);
//     if (val && idx < 3) inputs.current[idx + 1]?.focus();
//   };

//   const handleKeyDown = (e, idx) => {
//     if (e.key === "Backspace" && !pin[idx] && idx > 0) {
//       const newPin = [...pin];
//       newPin[idx - 1] = "";
//       setPin(newPin);
//       inputs.current[idx - 1]?.focus();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       {/* Status Bar */}
//       <div className="bg-black h-8 w-full" />

//       {/* Yellow Header */}
//       <div className="bg-yellow-400 flex items-center justify-center py-8">
//         <h1 className="text-3xl font-black text-gray-900 tracking-wide">MoMo</h1>
//       </div>

//       {/* Content */}
//       <div className="flex flex-col items-center flex-1 pt-16 px-6">
//         {/* Title */}
//         <p className="text-2xl text-gray-800 font-light mb-10 tracking-wide">
//           Enter your PIN
//         </p>

//         {/* PIN Dot Boxes — tap karo to mobile keyboard khule */}
//         <div className="flex gap-5 mb-12">
//           {pin.map((digit, idx) => (
//             <div key={idx} className="relative">
//               {/* Hidden actual input */}
//               <input
//                 ref={(el) => (inputs.current[idx] = el)}
//                 type="password"
//                 inputMode="numeric"
//                 pattern="[0-9]*"
//                 maxLength={1}
//                 value={digit}
//                 onChange={(e) => handleChange(e.target.value, idx)}
//                 onKeyDown={(e) => handleKeyDown(e, idx)}
//                 className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
//                 autoComplete="off"
//               />
//               {/* Visual dot */}
//               <div
//                 onClick={() => inputs.current[idx]?.focus()}
//                 className={`w-12 h-12 rounded-full transition-colors duration-150 cursor-pointer ${
//                   digit ? "bg-yellow-400" : "bg-gray-300"
//                 }`}
//               />
//             </div>
//           ))}
//         </div>

//         {/* Forgot PIN */}
//         <button className="mt-4 text-blue-600 font-semibold text-base hover:underline">
//           Forgot PIN?
//         </button>
//       </div>

//       {/* Bottom Nav */}
//       <div className="bg-white flex justify-around items-center py-3 px-10 pb-5">
//         <div className="w-6 h-6 border-2 border-gray-500 rounded-sm" />
//         <div className="w-6 h-6 border-2 border-gray-500 rounded-full flex items-center justify-center">
//           <div className="w-2 h-2 border border-gray-500 rounded-full" />
//         </div>
//         <div className="text-gray-500 text-xl">◀</div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function PINEntry() {
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputs = useRef([]);
  const navigate = useNavigate(); // ✅

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const newPin = [...pin];
    newPin[idx] = val;
    setPin(newPin);
    if (val && idx < 3) inputs.current[idx + 1]?.focus();
    // ✅ Jab PIN complete ho — dashboard ya next page pe bhejo
    if (val && idx === 3) {
      setTimeout(() => navigate("/dashboard"), 300);
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !pin[idx] && idx > 0) {
      const newPin = [...pin];
      newPin[idx - 1] = "";
      setPin(newPin);
      inputs.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-black h-8 w-full" />

      <div className="bg-yellow-400 flex items-center justify-between py-8 px-4">
        <button
          onClick={() => navigate(-1)} // ✅ Wapas OTP pe
          className="text-gray-900 text-2xl font-bold"
        >
          ‹
        </button>
        <h1 className="text-3xl font-black text-gray-900 tracking-wide">MoMo</h1>
        <div className="w-6" /> {/* spacer for centering */}
      </div>

      <div className="flex flex-col items-center flex-1 pt-16 px-6">
        <p className="text-2xl text-gray-800 font-light mb-10 tracking-wide">
          Enter your PIN
        </p>

        <div className="flex gap-5 mb-12">
          {pin.map((digit, idx) => (
            <div key={idx} className="relative">
              <input
                ref={(el) => (inputs.current[idx] = el)}
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                autoComplete="off"
              />
              <div
                onClick={() => inputs.current[idx]?.focus()}
                className={`w-12 h-12 rounded-full transition-colors duration-150 cursor-pointer ${
                  digit ? "bg-yellow-400" : "bg-gray-300"
                }`}
              />
            </div>
          ))}
        </div>

        <button className="mt-4 text-blue-600 font-semibold text-base hover:underline">
          Forgot PIN?
        </button>
      </div>

      <div className="bg-white flex justify-around items-center py-3 px-10 pb-5">
        <div className="w-6 h-6 border-2 border-gray-500 rounded-sm" />
        <div className="w-6 h-6 border-2 border-gray-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 border border-gray-500 rounded-full" />
        </div>
        <div className="text-gray-500 text-xl">◀</div>
      </div>
    </div>
  );
}