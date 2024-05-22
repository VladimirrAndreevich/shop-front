import MainContainer from "@/components/MainContainer/MainContainer";
import Orders from "@/features/Orders/Orders";
import { Typography } from "@mui/material";

const OrdersList: React.FC = () => {
  return (
    <MainContainer sx={{ py: { xs: 3, md: 4, lg: 8 } }} maxWidth="lg">
      <Typography variant="h2" fontSize={35}>
        Your orders
      </Typography>
      <Orders />
    </MainContainer>
  );
};

export default OrdersList;
