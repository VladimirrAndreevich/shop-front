import OrderItem from "@/OrderItem/OrderItem";
import { getStoreInstance } from "@/store/user-store";
import { I_Order } from "@/types";
import { Stack } from "@mui/material";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<I_Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios
        .post(`${process.env.API_URL_BACKEND}/users/orders`, {}, config)
        .then((response) => response.data);

      // console.log(response);
      setOrders(response.orders);
      setIsLoading(false);
    };

    if (localStorage.getItem("token")) {
      getOrders();
    }
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Stack spacing={3} mt={4}>
      {orders.map((order) => (
        <OrderItem orderData={order} />
      ))}
    </Stack>
  );
};

export default observer(Orders);
