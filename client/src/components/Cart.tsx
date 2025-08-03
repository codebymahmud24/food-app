import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import CheckoutConfirmPage from "./CheckoutConfirmPage";
import type { CartItem } from "@/types/cartType";

// 🔧 Dummy cart data
const demoCart: CartItem[] = [
  {
    _id: "1",
    name: "Cheesy Pizza",
    price: 12,
    quantity: 2,
    image: "https://source.unsplash.com/featured/?pizza",
    description: "Delicious cheesy pizza with fresh toppings",
  },
  {
    _id: "2",
    name: "Veggie Pasta",
    price: 10,
    quantity: 1,
    image: "https://source.unsplash.com/featured/?pasta",
    description: "Creamy pasta with mixed vegetables",
  },
];

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(demoCart);

  const incrementQuantity = (id: string) => {
    setCart(prev =>
      prev.map(item =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: string) => {
    setCart(prev =>
      prev.map(item =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  const clearAll = () => {
    setCart([]);
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button variant="link" onClick={clearAll}>
          Clear All
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item: CartItem) => (
            <TableRow key={item._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={item.image} alt={item.name} />
                  <AvatarFallback>IT</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>₹{item.price}</TableCell>
              <TableCell>
                <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                  <Button
                    onClick={() => decrementQuantity(item._id)}
                    size="icon"
                    variant="outline"
                    className="rounded-full bg-gray-200"
                  >
                    <Minus />
                  </Button>
                  <Button
                    size="icon"
                    className="font-bold border-none"
                    disabled
                    variant="outline"
                  >
                    {item.quantity}
                  </Button>
                  <Button
                    onClick={() => incrementQuantity(item._id)}
                    size="icon"
                    className="rounded-full bg-orange hover:bg-hoverOrange"
                    variant="outline"
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>
              <TableCell>₹{item.price * item.quantity}</TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => removeItem(item._id)}
                  size="sm"
                  className="bg-orange hover:bg-hoverOrange"
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="text-2xl font-bold">
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">₹{totalAmount}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        <Button
          onClick={() => setOpen(true)}
          className="bg-orange hover:bg-hoverOrange"
        >
          Proceed To Checkout
        </Button>
      </div>
      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
