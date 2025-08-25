import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  const handleClick = (url: string) => navigate({ to: `/${url}` });

  return (
    <>
      <Helmet>
        <title>K-Style Shop</title>
        <meta name="description" content="Find the best products here" />
      </Helmet>
      <div className="relative min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-100 flex flex-col items-center justify-center text-gray-800 overflow-hidden">
        <header className="absolute top-0 w-full p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            K-<span className="text-pink-500 ">Style</span>
          </h1>
        </header>

        <main className="flex flex-col items-center justify-center text-center space-y-10 px-4">
          <h2 className="text-4xl md:text-6xl font-extrabold animate-fadeInDown">
            Discover Your{" "}
            <span className="text-pink-500 underline">Perfect Glow</span>
          </h2>

          <p className="max-w-xl text-lg md:text-xl animate-fadeIn delay-500">
            Explore high-quality beauty products and brands curated just for
            you. Choose your style, embrace your confidence.
          </p>

          <div className="flex flex-col md:flex-row gap-6 mt-6">
            <Button
              className="bg-pink-500 text-white px-10 py-4 rounded-lg shadow-lg hover:bg-pink-600 transition-transform transform hover:scale-105"
              onClick={() => handleClick("brands")}
            >
              Shop by Brands
            </Button>

            <Button
              className="bg-white border-2 border-pink-500 text-pink-500 px-10 py-4 rounded-lg shadow-lg hover:bg-pink-50 transition-transform transform hover:scale-105"
              onClick={() => handleClick("products")}
            >
              Shop by Products
            </Button>
          </div>
        </main>

        <div className="absolute top-20 left-10 w-16 h-16 bg-pink-200 rounded-full opacity-50 animate-float1" />
        <div className="absolute bottom-20 right-16 w-24 h-24 bg-pink-300 rounded-full opacity-40 animate-float2" />
      </div>
    </>
  );
}
