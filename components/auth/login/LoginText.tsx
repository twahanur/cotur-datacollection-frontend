
import { Check } from "lucide-react";

const LoginText = () => {
  const texts = [
    "Manage the users to perform the action",
    "Manage the customer data confidently",
    "Assigned target for individual agent to add customer",
  ];
  return (
    <div className="space-y-8 px-4 hidden lg:block">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">Chotur</h1>
      </div>
      <div className="space-y-4">
        <h1 className="font-poppins text-2xl md:text-[32px] font-medium leading-tight md:leading-[42px] bg-linear-to-b from-[#C3C0D8] to-[#4E0C73] bg-clip-text text-transparent">
          Manage the customer data <br /> with Chotur data management
        </h1>
        <p className="font-poppins text-sm md:text-[16px] font-normal leading-relaxed text-[#9B98AE] self-stretch max-w-lg">
          With the otp system now you can add real customer from your business,
          Manage the data with just some click and verification.
        </p>
      </div>

      <div className="space-y-3">
        {texts.map((text, i) => (
          <p key={i} className="flex items-start gap-2">
            <span className="text-[#9A8DEC] shrink-0 mt-1">
              <Check size={18} />
            </span>{" "}
            <span className="text-[#EEEBFF] text-sm md:text-base">{text}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default LoginText;
