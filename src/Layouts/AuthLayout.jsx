const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-300 to-emerald-200" />

      {/* Mountains */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-emerald-900 via-emerald-800 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-emerald-800 via-emerald-700 to-transparent opacity-80" />

      {/* Clouds */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-32 right-20 w-96 h-96 bg-white/30 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AuthLayout;
