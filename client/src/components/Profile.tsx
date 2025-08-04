import {
  Loader2,
  LocateIcon,
  Mail,
  MapPin,
  MapPinnedIcon,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { type FormEvent, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const Profile = () => {
  // 🧪 Mock user demo data
  const mockUser = {
    fullname: "Foodie Tester",
    email: "LHw8M@example.com",
    address: "123 MERN Street",
    city: "Dhaka",
    country: "Bangladesh",
    profilePicture: "https://i.pravatar.cc/150?img=5",
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState({ ...mockUser });
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>(
    mockUser.profilePicture
  );

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result);
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const updateProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate async update
    setTimeout(() => {
      console.log("Updated Profile Data:", profileData);
      setIsLoading(false);
      alert("Profile updated (demo only)");
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gradient-to-br from-orange-50 to-white py-8">
      <form
        onSubmit={updateProfileHandler}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-8"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <Avatar className="md:w-32 md:h-32 w-24 h-24 border-4 border-orange-200 shadow">
              <AvatarImage src={selectedProfilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <input
              ref={imageRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={fileChangeHandler}
            />
            <button
              type="button"
              onClick={() => imageRef.current?.click()}
              className="absolute bottom-2 right-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 shadow-lg opacity-90 group-hover:opacity-100 transition-opacity"
              title="Change profile picture"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <Input
            type="text"
            name="fullname"
            value={profileData.fullname}
            onChange={changeHandler}
            className="font-bold text-2xl text-center border-none focus-visible:ring-2 focus-visible:ring-orange-200"
            placeholder="Full Name"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="flex items-center gap-4 rounded-lg p-4 bg-orange-50 border border-orange-100">
            <Mail className="text-orange-400" />
            <div className="w-full">
              <Label className="text-orange-500">Email</Label>
              <input
                disabled
                name="email"
                value={profileData.email}
                onChange={changeHandler}
                className="w-full text-gray-600 bg-transparent focus-visible:ring-0 border-none outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg p-4 bg-orange-50 border border-orange-100">
            <LocateIcon className="text-orange-400" />
            <div className="w-full">
              <Label className="text-orange-500">Address</Label>
              <input
                name="address"
                value={profileData.address}
                onChange={changeHandler}
                className="w-full text-gray-600 bg-transparent focus-visible:ring-0 border-none outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg p-4 bg-orange-50 border border-orange-100">
            <MapPin className="text-orange-400" />
            <div className="w-full">
              <Label className="text-orange-500">City</Label>
              <input
                name="city"
                value={profileData.city}
                onChange={changeHandler}
                className="w-full text-gray-600 bg-transparent focus-visible:ring-0 border-none outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg p-4 bg-orange-50 border border-orange-100">
            <MapPinnedIcon className="text-orange-400" />
            <div className="w-full">
              <Label className="text-orange-500">Country</Label>
              <input
                name="country"
                value={profileData.country}
                onChange={changeHandler}
                className="w-full text-gray-600 bg-transparent focus-visible:ring-0 border-none outline-none"
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          {isLoading ? (
            <Button disabled className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-lg shadow">
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-lg shadow font-semibold"
            >
              Update
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
