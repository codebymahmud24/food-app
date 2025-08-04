import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  HandPlatter,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";

interface User {
  name: string;
  profilePicture: string;
  admin: boolean;
}

const Navbar = () => {
  // 🚀 Demo user and cart data
  const user = {
    name: "Patel Mernstack",
    profilePicture: "https://i.pravatar.cc/150?img=5",
    admin: true,
  };
  const cart = [1, 2]; // 2 items
  const setTheme = (theme: string) => console.log(`Theme set to: ${theme}`);

  return (
    <nav className="w-full">
      {/* Orange gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-t-lg mb-1" />
      <div className="max-w-7xl mx-auto ">
        <div className="flex items-center px-2 sm:px-4 justify-between h-16 border-b border-orange-100 bg-white/90 shadow-lg rounded-b">
          <Link to="/">
            <h1 className="font-extrabold text-2xl text-orange-500 tracking-tight hover:text-orange-600 transition-all duration-200 drop-shadow-md">
              FoodApp
            </h1>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-6">
              <Link className="hover:text-orange-600 transition-all font-semibold px-2 py-1 rounded hover:bg-orange-50" to="/">
                Home
              </Link>
              <Link className="hover:text-orange-600 transition-all font-semibold px-2 py-1 rounded hover:bg-orange-50" to="/profile">
                Profile
              </Link>
              <Link className="hover:text-orange-600 transition-all font-semibold px-2 py-1 rounded hover:bg-orange-50" to="/order/status">
                Order
              </Link>

              {user.admin && (
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger className="hover:text-orange-600 transition-all font-semibold px-2 py-1 rounded hover:bg-orange-50">
                      Dashboard
                    </MenubarTrigger>
                    <MenubarContent>
                      <Link to="/admin/restaurant">
                        <MenubarItem>Restaurant</MenubarItem>
                      </Link>
                      <Link to="/admin/menu">
                        <MenubarItem>Menu</MenubarItem>
                      </Link>
                      <Link to="/admin/orders">
                        <MenubarItem>Orders</MenubarItem>
                      </Link>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              )}
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="border-orange-300 hover:bg-orange-100 transition-colors">
                    <Sun className="h-[1.2rem] w-[1.2rem] dark:scale-0 text-orange-500" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 dark:scale-100 text-orange-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/cart" className="relative cursor-pointer group">
                <ShoppingCart className="text-orange-500 group-hover:scale-110 transition-transform" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs rounded-full w-6 h-6 flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold border-2 border-white shadow-lg animate-bounce">
                    {cart.length}
                  </span>
                )}
              </Link>

              <div className="transition-transform hover:scale-105">
                <Avatar>
                  <AvatarImage src={user.profilePicture} alt="profilephoto" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>

              <Button className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold transition-all shadow px-4 py-2 rounded-lg">
                Logout
              </Button>
            </div>
          </div>
          {/* Mobile menu */}
          <div className="md:hidden">
            <MobileNavbar user={user} setTheme={setTheme} cartCount={cart.length} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const MobileNavbar = ({
  user,
  setTheme,
  cartCount,
}: {
  user: User;
  setTheme: (theme: string) => void;
  cartCount: number;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="rounded-full bg-gray-200 text-black">
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>FoodApp</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 dark:scale-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <Separator className="my-2" />
        <SheetDescription className="flex-1">
          <Link
            to="/profile"
            className="flex items-center gap-4 px-3 py-2 hover:bg-gray-200 rounded-lg font-medium"
          >
            <User />
            <span>Profile</span>
          </Link>
          <Link
            to="/order/status"
            className="flex items-center gap-4 px-3 py-2 hover:bg-gray-200 rounded-lg font-medium"
          >
            <HandPlatter />
            <span>Order</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-4 px-3 py-2 hover:bg-gray-200 rounded-lg font-medium"
          >
            <ShoppingCart />
            <span>Cart ({cartCount})</span>
          </Link>

          {user.admin && (
            <>
              <Link
                to="/admin/menu"
                className="flex items-center gap-4 px-3 py-2 hover:bg-gray-200 rounded-lg font-medium"
              >
                <SquareMenu />
                <span>Menu</span>
              </Link>
              <Link
                to="/admin/restaurant"
                className="flex items-center gap-4 px-3 py-2 hover:bg-gray-200 rounded-lg font-medium"
              >
                <UtensilsCrossed />
                <span>Restaurant</span>
              </Link>
              <Link
                to="/admin/orders"
                className="flex items-center gap-4 px-3 py-2 hover:bg-gray-200 rounded-lg font-medium"
              >
                <PackageCheck />
                <span>Orders</span>
              </Link>
            </>
          )}
        </SheetDescription>
        <SheetFooter className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">{user.name}</h1>
          </div>
          <SheetClose asChild>
            <Button className="bg-orange hover:bg-hoverOrange">Logout</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
