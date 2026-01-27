const Home = () => (
  <div className="min-h-screen flex flex-col justify-center items-center">
    <h1 className="text-5xl font-extrabold">
      🌾 FarmXChain
    </h1>
    <p className="text-gray-500 mt-4">
      AI-Driven Agricultural Marketplace
    </p>

    <div className="mt-6 flex gap-4">
      <a href="/login" className="btn-primary">
        Login
      </a>
      <a href="/login" className="btn-secondary">
        Register
      </a>
    </div>
  </div>
);

export default Home;
