import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const CheckoutConfirmPage = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  // ✅ Demo user data
  const demoUser = {
    fullname: "Mahmud Hossain",
    email: "mahmud@example.com",
    contact: "01712345678",
    address: "123 Demo Street",
    city: "Dhaka",
    country: "Bangladesh",
  };

  // ✅ Demo cart data
  const demoCart = [
    {
      _id: "1",
      name: "Pizza",
      image: "https://source.unsplash.com/featured/?pizza",
      price: "12",
      quantity: "2",
    },
    {
      _id: "2",
      name: "Pasta",
      image: "https://source.unsplash.com/featured/?pasta",
      price: "10",
      quantity: "1",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: demoUser.fullname,
    email: demoUser.email,
    contact: demoUser.contact,
    address: demoUser.address,
    city: demoUser.city,
    country: demoUser.country,
  });

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  };

  const checkoutHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Simulate checkout payload creation
    const payload = {
      cartItems: demoCart,
      deliveryDetails: input,
      restaurantId: "demo-restaurant-id",
    };

    // ✅ Simulate API call
    setTimeout(() => {
      console.log("Checkout Submitted:", payload);
      alert("✅ Checkout submitted successfully!");
      setLoading(false);
      setOpen(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle className="font-semibold">Review Your Order</DialogTitle>
        <DialogDescription className="text-xs">
          Double-check your delivery details and ensure everything is in order.
          When you are ready, hit confirm button to finalize your order.
        </DialogDescription>

        <form
          onSubmit={checkoutHandler}
          className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0"
        >
          <div>
            <Label>Fullname</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              disabled
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Contact</Label>
            <Input
              type="text"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              type="text"
              name="address"
              value={input.address}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              value={input.city}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Country</Label>
            <Input
              type="text"
              name="country"
              value={input.country}
              onChange={changeEventHandler}
            />
          </div>

          <DialogFooter className="col-span-2 pt-5">
            {loading ? (
              <Button disabled className="bg-orange hover:bg-hoverOrange">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="bg-orange hover:bg-hoverOrange">
                Continue To Payment
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutConfirmPage;
