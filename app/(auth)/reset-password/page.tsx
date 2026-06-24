import ResetPassword from "@/components/auth/resetPassword/ResetPassword";
import { verifyForgetPassToken } from "@/service/authService";
import { TSearchParams } from "@/types/shared.types";

const SetNewPasswordPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const { token } = await searchParams;
  const result = await verifyForgetPassToken(token as string);
  const isVerified = result?.success;
  return (
    <section className="min-h-screen flex items-center justify-center">
      <ResetPassword token={token as string} isVerified={isVerified} />
    </section>
  );
};

export default SetNewPasswordPage;
