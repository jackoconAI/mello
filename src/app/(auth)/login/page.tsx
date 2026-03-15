import { LoginForm } from "@/components/layout/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f9fa] to-[#fef0eb] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#f87b4d] text-white text-2xl font-bold mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
            E
          </div>
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Oswald', sans-serif" }}>
            MELLO
          </h1>
          <p className="text-gray-500 mt-1">by Entrusted — Built on Trust</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
