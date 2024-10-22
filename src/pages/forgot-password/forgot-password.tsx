import { useRef, useState } from "react";
import Step1 from "./components/step-1";
import Step2 from "./components/step-2";
import Step3 from "./components/step-3";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const refData = useRef();
  const handleToStep2 = (data: any) => {
    refData.current = data;
    setStep(2);
  };
  const handleToStep3 = () => {
    setStep(3);
  };
  return (
    <div>
      {step === 1 && <Step1 nextStep={handleToStep2} />}
      {step === 2 && <Step2 nextStep={handleToStep3} />}
      {step === 3 && <Step3 />}
    </div>
  );
};

export default ForgotPassword;
