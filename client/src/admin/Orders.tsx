import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Truck, Loader2, CheckCircle, Clock, AlertTriangle } from "lucide-react"; // Icons for statuses

const statusIcons = {
  pending: <Clock className="w-4 h-4 mr-2 text-yellow-500" />,
  confirmed: <CheckCircle className="w-4 h-4 mr-2 text-green-500" />,
  preparing: <Loader2 className="w-4 h-4 mr-2 text-blue-500 animate-spin" />,
  outfordelivery: <Truck className="w-4 h-4 mr-2 text-orange-500" />,
  delivered: <CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />,
};

const restaurantOrder = [
  {
    _id: "1",
    deliveryDetails: {
      name: "John Doe",
      address: "123 Main St, Anytown USA",
    },
    totalAmount: 1000,
    status: "pending",
  },
];

const Orders = () => {

  const handleStatusChange = async (id: string, status: string) => {
    // TODO: Implement status change logic
    console.log(`Changing order ${id} to status ${status}`);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">
        🧾 Orders Overview
      </h1>

      <div className="space-y-6">
        {restaurantOrder.map((order) => (
          <div
            key={order._id}
            className="flex flex-col md:flex-row justify-between gap-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6"
          >
            <div className="flex-1 space-y-2">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {order.deliveryDetails.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">📍 Address:</span>{" "}
                {order.deliveryDetails.address}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">💵 Total:</span>{" "}
                ৳{order.totalAmount / 100}
              </p>
            </div>

            <div className="w-full md:w-1/3">
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </Label>
              <Select
                onValueChange={(newStatus: string) =>
                  handleStatusChange(order._id, newStatus)
                }
                defaultValue={order.status}
              >
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[
                      "Pending",
                      "Confirmed",
                      "Preparing",
                      "OutForDelivery",
                      "Delivered",
                    ].map((status, index) => {
                      const lowerStatus = status.toLowerCase();
                      return (
                        <SelectItem
                          key={index}
                          value={lowerStatus}
                          className="capitalize"
                        >
                          <div className="flex items-center">
                            {statusIcons[lowerStatus as keyof typeof statusIcons] ??
                              <AlertTriangle className="w-4 h-4 mr-2 text-gray-500" />}
                            {status}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
