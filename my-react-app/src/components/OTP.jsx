import React, { useEffect, useRef, useState } from "react";

function Otp({ otpLength = 4 }) {
  const [otpFields, setOtpFields] = useState(new Array(otpLength).fill(""));
  const ref = useRef([]);

  function handleKeyDown(e, index){
    const key = e.key;
    if(key === 'ArrowRight'){
        if(index < otpFields.length - 1) ref.current[index + 1].focus();
           // return;
    }

    if(key === 'ArrowLeft'){
        if(index > 0) ref.current[index - 1].focus();
          //  return;
    }

  }

  useEffect(() =>{
    ref.current[0]?.focus();
  }, []);
  
  return (
    <div className="container">
      {otpFields.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          maxLength={1}
          className="otp-input"
          ref={(currentInput) =>(ref.current[index]= currentInput)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
}

export default Otp;
