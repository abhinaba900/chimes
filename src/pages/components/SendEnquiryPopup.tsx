import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

function SendEnquiryPopup({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [showSendOtp, setShowSendOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Exit early when we reach 0
    if (!timeLeft) {
      if (otpSent) setCanResend(true);
      return;
    }

    // Save intervalId to clear the interval when the component unmounts
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, otpSent]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, phone: value });
    // Simple email validation to show/hide send OTP button
    const showSendOtp = /^\d{10}$/.test(value);

    if (showSendOtp) {
      setShowSendOtp(showSendOtp);
      setError({ ...error, phone: "" });
    } else {
      setError({ ...error, phone: "Invalid phone number" });
    }
    setOtpSent(false);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    setShowSendOtp(false);
    setTimeLeft(30); // Start 30 second timer
    setCanResend(false);
    // Here you would actually send the OTP to the email
    console.log("OTP sent to:", email);
  };

  const handleResendOtp = () => {
    setTimeLeft(30); // Reset timer to 30 seconds
    setCanResend(false);
    // Here you would resend the OTP
    console.log("OTP resent to:", email);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enquiry message:", message);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setMessage("");
    setEmail("");
    setShowSendOtp(false);
    setOtpSent(false);
    setTimeLeft(0);
    setCanResend(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-99 ">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative popup-dilog transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-[800px] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <button onClick={handleClose} className="close-icon">
              <img src="assets/close menu icon.png" alt="" />
            </button>
            <div className="popup-dilog-holder">
              <div>
                <img
                  src="assets/popup left image.png"
                  alt="popup left image"
                  className="popup-dilog-left-image"
                />
              </div>
              <div className="right-side-popup-content-holder">
                <img
                  src="assets/popup bird image.png"
                  alt="popup right image"
                  className="popup-dilog-right-image"
                />

                <h4>Let's Begin Your Journey Home</h4>
                <p>
                  Tell us a little about yourself, and we'll guide you to a home
                  that blends mindful design, natural comfort, and modern
                  living, just the way you imagined.
                </p>

                <form className="popup-dilog-form" onSubmit={handleSend}>
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email ID</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email ID"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact">Contact Number</label>
                    <div className="relative">
                      <input
                        type="number"
                        id="contact"
                        placeholder="Enter your contact number"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        required
                      />
                      {showSendOtp && (
                        <button
                          className="send-otp"
                          type="button"
                          onClick={handleSendOtp}
                        >
                          Send OTP
                        </button>
                      )}
                    </div>
                    {error.phone && (
                      <span className="error">{error.phone}</span>
                    )}
                  </div>
                  {otpSent && (
                    <div>
                      <label htmlFor="otp">OTP</label>
                      <div>
                        <input
                          type="number"
                          id="otp"
                          placeholder="Enter OTP"
                          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                          required
                        />
                        <span>
                          00:{timeLeft.toString().padStart(2, "0")}s -{" "}
                          <button
                            type="button"
                            className="resend-otp"
                            onClick={handleResendOtp}
                            disabled={!canResend}
                          >
                            Resend OTP
                          </button>
                        </span>
                      </div>
                    </div>
                  )}

                  <button type="submit" disabled={!otpSent}>
                    Send Enquiry
                  </button>
                </form>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default SendEnquiryPopup;
