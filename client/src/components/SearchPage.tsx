import { Link, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Globe, MapPin, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
// import { Skeleton } from "./ui/skeleton";

// Demo restaurant type
type Restaurant = {
  _id: string;
  restaurantName: string;
  city: string;
  country: string;
  cuisines: string[];
  imageUrl: string;
};

// Demo restaurants data
const demoRestaurants: Restaurant[] = [
  {
    _id: "1",
    restaurantName: "Royal Biryani House",
    city: "Dhaka",
    country: "Bangladesh",
    cuisines: ["Biryani"],
    imageUrl: "https://source.unsplash.com/400x200/?biryani",
  },
  {
    _id: "2",
    restaurantName: "Momolicious",
    city: "Chittagong",
    country: "Bangladesh",
    cuisines: ["Momos"],
    imageUrl: "https://source.unsplash.com/400x200/?momos",
  },
  {
    _id: "3",
    restaurantName: "Burger King",
    city: "Dhaka",
    country: "Bangladesh",
    cuisines: ["Burger"],
    imageUrl: "https://source.unsplash.com/400x200/?burger",
  },
  {
    _id: "4",
    restaurantName: "Thali Express",
    city: "Sylhet",
    country: "Bangladesh",
    cuisines: ["Thali"],
    imageUrl: "https://source.unsplash.com/400x200/?thali",
  },
  {
    _id: "5",
    restaurantName: "Biryani Express",
    city: "Khulna",
    country: "Bangladesh",
    cuisines: ["Biryani"],
    imageUrl: "https://source.unsplash.com/400x200/?biryani,food",
  },
];

const SearchPage = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [appliedFilter, setAppliedFilter] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchedRestaurant, setSearchedRestaurant] = useState<{ data: Restaurant[] }>({ data: [] });

  // Search and filter logic (simulate loading)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let filtered = demoRestaurants;

      if (appliedFilter.length > 0) {
        filtered = filtered.filter((r) =>
          r.cuisines.some((cuisine) => appliedFilter.includes(cuisine))
        );
      }

      if (searchQuery.trim()) {
        const lowerSearch = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (r) =>
            r.restaurantName.toLowerCase().includes(lowerSearch) ||
            r.cuisines.some((c) => c.toLowerCase().includes(lowerSearch))
        );
      }

      setSearchedRestaurant({ data: filtered });
      setLoading(false);
    }, 700);
  }, [searchQuery, appliedFilter, params.text]);

  const removeFilter = (filterToRemove: string) => {
    setAppliedFilter((prev) => prev.filter((f) => f !== filterToRemove));
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-orange-50 via-white to-orange-100 py-12">
      <div className="max-w-7xl mx-auto rounded-3xl shadow-2xl bg-white/80 p-6 md:p-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <FilterPage appliedFilter={appliedFilter} setAppliedFilter={setAppliedFilter} />
          <div className="flex-1">
            {/* Search Input Field */}
            <div className="flex items-center gap-2 mb-6">
              <Input
                type="text"
                value={searchQuery}
                placeholder="Search by restaurant & cuisines"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-full shadow-md border-orange-200 focus:ring-2 focus:ring-orange-400"
              />
              <Button
                onClick={() => {}}
                className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold px-6 py-2 rounded-full shadow transition-all"
              >
                Search
              </Button>
            </div>

            {/* Display applied filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {appliedFilter.map((filter, idx) => (
                <div
                  key={idx}
                  className="relative inline-flex items-center max-w-full"
                >
                  <Badge
                    className="text-[#D19254] rounded-full bg-orange-100 border border-orange-300 hover:bg-orange-200 pr-6 whitespace-nowrap shadow"
                    variant="outline"
                  >
                    {filter}
                  </Badge>
                  <X
                    onClick={() => removeFilter(filter)}
                    size={16}
                    className="absolute text-[#D19254] right-1 hover:cursor-pointer hover:text-orange-600"
                  />
                </div>
              ))}
            </div>

            {/* Restaurant Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {loading ? (
                <SearchPageSkeleton />
              ) : searchedRestaurant.data.length === 0 ? (
                <NoResultFound searchText={searchQuery || params.text || ""} />
              ) : (
                searchedRestaurant.data.map((restaurant) => (
                  <Card
                    key={restaurant._id}
                    className="bg-white/90 dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-orange-100"
                  >
                    <div className="relative">
                      <AspectRatio ratio={16 / 6}>
                        <img
                          src={restaurant.imageUrl}
                          alt={restaurant.restaurantName}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </AspectRatio>
                      <div className="absolute top-2 left-2 bg-white/80 dark:bg-gray-700 rounded-lg px-3 py-1 shadow">
                        <span className="text-xs font-semibold text-orange-600">
                          Featured
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h1 className="text-xl font-bold text-orange-700 dark:text-gray-100 mb-2">
                        {restaurant.restaurantName}
                      </h1>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-1">
                        <MapPin size={16} />
                        <span>
                          <span className="font-medium">{restaurant.city}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-2">
                        <Globe size={16} />
                        <span>
                          <span className="font-medium">{restaurant.country}</span>
                        </span>
                      </div>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {restaurant.cuisines.map((cuisine, idx) => (
                          <Badge
                            key={idx}
                            className="font-medium px-2 py-1 rounded-full bg-orange-100 text-orange-700 shadow-sm"
                          >
                            {cuisine}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-5 border-t border-orange-100 flex justify-end">
                      <Link to={`/restaurant/${restaurant._id}`}>
                        <Button className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
                          View Menus
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

// Skeleton with shimmer effect
const SearchPageSkeleton = () => (
  <>
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-white/80 dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-orange-100 animate-pulse"
      >
        <div className="relative">
          <AspectRatio ratio={16 / 6}>
            <div className="w-full h-full bg-gradient-to-r from-orange-100 via-orange-50 to-orange-100 animate-shimmer" />
          </AspectRatio>
        </div>
        <CardContent className="p-5">
          <div className="h-6 w-3/4 mb-3 rounded bg-orange-100" />
          <div className="h-4 w-1/2 mb-2 rounded bg-orange-100" />
          <div className="h-4 w-1/3 mb-2 rounded bg-orange-100" />
          <div className="flex gap-2 mt-4 flex-wrap">
            <div className="h-6 w-16 rounded-full bg-orange-100" />
            <div className="h-6 w-16 rounded-full bg-orange-100" />
          </div>
        </CardContent>
        <CardFooter className="p-5 flex justify-end">
          <div className="h-10 w-24 rounded-full bg-orange-100" />
        </CardFooter>
      </div>
    ))}
    <style>
      {`
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .animate-shimmer {
          background-size: 800px 100%;
          animation: shimmer 1.5s infinite linear;
        }
      `}
    </style>
  </>
);

// Not found with illustration
const NoResultFound = ({ searchText }: { searchText: string }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-16">
    <img
      src="https://cdn.dribbble.com/users/2131993/screenshots/6011020/food-search.gif"
      alt="No results"
      className="w-48 h-48 object-contain mb-6 opacity-90"
      draggable={false}
    />
    <h1 className="text-2xl font-bold text-orange-600 mb-2">
      No results found
    </h1>
    <p className="mb-4 text-gray-500 text-center max-w-xs">
      We couldn't find any results for <span className="font-semibold text-orange-500">"{searchText}"</span>.<br />
      Try searching with a different term or check your spelling.
    </p>
    <Link to="/">
      <Button className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold px-6 py-2 rounded-full shadow transition-all">
        Go Back to Home
      </Button>
    </Link>
  </div>
);
