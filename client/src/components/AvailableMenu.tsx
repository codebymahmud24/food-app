
import type { MenuItem } from "@/types/restaurantType";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useToast } from "../context/toast-context";

const AvailableMenu = ({ menus }: { menus: MenuItem[] }) => {
  const { toast } = useToast();

  const handleAddToCart = (menu: MenuItem) => {
    console.log(menu);
    try {
      // TODO: Implement cart functionality
      toast({message:"Item added to cart",type:"success"});
    } catch (error) {
      toast({message:`Failed to add ${menu.name} to cart ${error}`,type:"error"});
    }
  };

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menus.map((menu: MenuItem) => (
          <Card key={menu._id} className="group hover:shadow-lg transition-shadow duration-200 rounded-xl overflow-hidden">
            <div className="relative">
              <img src={menu.image} alt={menu.name} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
            <CardContent className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-[#D19254] transition-colors duration-200">
                {menu.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{menu.description}</p>
              <h3 className="text-lg font-semibold mt-4 flex items-center justify-between">
                <span className="text-[#D19254]">₹{menu.price}</span>
                <Button
                  onClick={() => handleAddToCart(menu)}
                  className="bg-[#D19254] hover:bg-[#b17a43] text-white transition-colors duration-200"
                >
                  Add to Cart
                </Button>
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvailableMenu;
