import toast from "react-hot-toast";
import AvailableMenu from "./AvailableMenu";
import { Badge } from "./ui/badge";
import { Timer, Star, MapPin, Phone } from "lucide-react";

// ✅ Dummy restaurant data
const demoRestaurant = {
  restaurantName: "Demo Bistro",
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT8IkXGCFhLOa5BC5FUAYd2YO86Sr8wYBOrQ&s",
  cuisines: ["Italian", "Continental", "Desserts"],
  deliveryTime: 30,
  rating: 4.5,
  address: "123 Food Street, Cuisine City",
  phone: "+1 234-567-8900",
  menus: [
    {
      _id: "1",
      name: "Margherita Pizza",
      price: 12,
      description: "Classic delight with 100% real mozzarella cheese",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQBkgxlpQcc-ISh2OpEjy-WtOuQzZ3IgKyDw&s",
    },
    {
      _id: "2",
      name: "Pasta Alfredo",
      price: 15,
      description: "Creamy white sauce pasta with garlic bread",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQBkgxlpQcc-ISh2OpEjy-WtOuQzZ3IgKyDw&s",
    },
  ],
};

const RestaurantDetail = () => {
  // ✅ Use dummy restaurant data
  const restaurant = demoRestaurant;

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <div className="w-full bg-white rounded-xl shadow-sm">
        <div className="relative w-full h-64 md:h-96 lg:h-128">
          <img
            src={restaurant.imageUrl}
            alt="res_image"
            className="object-cover w-full h-full rounded-t-xl"
          />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-medium">{restaurant.rating}</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="font-bold text-3xl text-gray-800">{restaurant.restaurantName}</h1>
              <div className="flex gap-2 my-3 flex-wrap">
                {restaurant.cuisines.map((cuisine, idx) => (
                  <Badge key={idx} variant="secondary" className="text-sm">
                    {cuisine}
                  </Badge>
                ))}
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{restaurant.address}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span>{restaurant.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Timer className="w-5 h-5" />
                  <span className="flex items-center gap-2">
                    Delivery Time: <span className="text-[#D19254] font-medium">{restaurant.deliveryTime} mins</span>
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => {
                try {
                  // Add your order logic here
                  toast.success("Order placed successfully!");
                } catch (error) {
                  const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
                  toast.error(`Failed to place order. Please try again. ${errorMessage}`);
                }
              }}
              className="mt-6 md:mt-0 px-6 py-3 bg-[#D19254] text-white rounded-full font-medium hover:bg-[#b17a43] transition-colors duration-200 flex items-center gap-2"
            >
              Order Now
            </button>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Menu</h2>
          {/* ✅ Pass dummy menu to AvailableMenu */}
          {restaurant.menus && <AvailableMenu menus={restaurant.menus} />}
        </div>
      </div>
    </div>
  );
};
export default RestaurantDetail;
