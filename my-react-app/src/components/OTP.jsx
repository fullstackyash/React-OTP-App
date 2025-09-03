import React, { useEffect, useRef, useState } from "react";

// We are creating a OTP component which accepts a prop of otpLength
// otpLength is defaulted to 4
function Otp({ otpLength = 4 }) {
  const [otpFields, setOtpFields] = useState(new Array(otpLength).fill(""));
  const ref = useRef([]);

  function handleKeyDown(e, index) {
    const key = e.key;
    if (key === "ArrowRight") {
      if (index < otpFields.length - 1) ref.current[index + 1].focus();
    }

    if (key === "ArrowLeft") {
      if (index > 0) ref.current[index - 1].focus();
    }

    //Make the copy of OPT array
    const copyOtpFields = [...otpFields];

    if (key === "Backspace") {
      copyOtpFields[index] = "";
      setOtpFields(copyOtpFields);

      if (index > 0) ref.current[index - 1].focus();
    }

    // Only single digit entries would be allowed
    if (!/^\d$/.test(key)) {
      // We check if the key pressed is anything else than a digit
      // If that is true then we simply return as this character is invalid
      return;
    }
    copyOtpFields[index] = key;
    setOtpFields(copyOtpFields);

    if (index < otpFields.length - 1) ref.current[index + 1].focus();
  }

  function handlePaste(e) {
    e.preventDefault();

    const pastedDated = e.clipboardData.getData("text");
    const digits = pastedDated.match(/\d/g);
    //The regex above will automatically filter out the digits from string

    if (!digits) return;

    const nextOtp = otpFields.slice();

    for (let i = 0; i < otpLength && digits.length; ++i) {
      nextOtp[i] = digits[i];
    }

    //Remove Undefined values, to fix Character input
    const newOtp = nextOtp.map(item => (item === undefined ? '' : item));

    setOtpFields(newOtp);

    //Fix and set focus for digits more than otpLength
    const nextFocus = digits.length < otpLength ? digits.length : otpLength - 1;
    ref.current[nextFocus].focus();
  }

  //Set the initial focus on the 1st Input on page load
  useEffect(() => {
    ref.current[0]?.focus();
  }, []);

  return (
    <div className="container">
      {console.log("otpFields= ", otpFields)}
      {otpFields.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          maxLength={1}
          className="otp-input"
          ref={(currentInput) => (ref.current[index] = currentInput)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}

export default Otp;
