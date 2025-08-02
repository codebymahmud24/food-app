import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import HereImage from "@/assets/hero_pizza.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();
  return (
    <section className="w-full bg-gradient-to-br to-white">
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 items-center justify-between gap-20 shadow-xl bg-white/80">
        {/* Left: Text & Search */}
        <div className="flex flex-col gap-10 md:w-[45%]">
          <div className="flex flex-col gap-5">
            <h1 className="font-extrabold text-4xl md:text-5xl text-orange-600 drop-shadow-lg leading-tight">
              Order Food{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
                anytime & anywhere
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              Hey! Our delicious food is waiting for you. We’re always near to you.
            </p>
          </div>
          <div className="relative flex items-center gap-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/search/${searchText}`);
              }}
              className="flex w-full gap-2"
            >
              <Input
                type="text"
                value={searchText}
                placeholder="Search restaurant by name, city & country"
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10 shadow-lg rounded-full border-orange-200 focus:ring-2 focus:ring-orange-400 w-full"
              />
              <Search className="text-orange-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Button
                type="submit"
                className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold px-6 py-2 rounded-full shadow transition-all"
              >
                Search
              </Button>
            </form>
          </div>
          <div className="flex gap-4 mt-2">
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold shadow">
              Fast Delivery
            </span>
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold shadow">
              Fresh Ingredients
            </span>
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold shadow">
              24/7 Service
            </span>
          </div>
        </div>
        {/* Right: Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={HereImage}
            alt="Delicious Pizza"
            className="object-contain w-full max-w-[400px] md:max-w-[500px] drop-shadow-2xl animate-bounce-slow"
            style={{ animation: "bounce 3s infinite" }}
          />
        </div>
      </div>
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0);}
            50% { transform: translateY(-12px);}
          }
          .animate-bounce-slow {
            animation: bounce 3s infinite;
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;