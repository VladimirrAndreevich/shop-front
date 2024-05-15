import { MainWrapper } from "@/components/MainWrapper/MainWrapper";
import { EmptyButton, EmptyDescription, EmptyHeading } from "./styled";
import Image from "next/image";
import { ImageDecor } from "@/components/ImageDecor/ImageDecor";
import { getStoreInstance } from "@/store/user-store";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Btn from "@/components/Btn/Btn";
import MainContainer from "@/components/MainContainer/MainContainer";
import SectionHeading from "@/SectionHeading/SectionHeading";
import {
  Box,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CartControlButtons from "@/features/CartControlButtons/CartControlButtons";

const CartPage: React.FC = () => {
  const router = useRouter();
  const userStore = getStoreInstance();

  useEffect(() => {
    if (!userStore.isLogged && !userStore.isTryingLogin) {
      router.push("/user/login");
    }
  }, []);

  if (userStore.isTryingLogin) {
    return <CircularProgress sx={{ color: "black" }} />;
  }

  if (
    (!userStore.cart || userStore.cart.length < 1) &&
    !userStore.isTryingLogin &&
    userStore.isLogged
  ) {
    return (
      <MainWrapper>
        <MainContainer
          sx={{ py: { xs: 3, md: 4, lg: 8 }, textAlign: "center" }}
          maxWidth="xl"
        >
          <SectionHeading>Cart of goods</SectionHeading>

          <Box display="flex" flexDirection="column" alignItems="center">
            <ImageDecor>
              <Image
                src="/icons/cart_empty.svg"
                width={84}
                height={98}
                alt="The icon of an empty cart"
              />
            </ImageDecor>

            <EmptyHeading>Your cart is currently empty.</EmptyHeading>
            <EmptyDescription>
              Before you proceed to checkout, you must add some items to your
              cart. On the Catalog page you will find many interesting products.
            </EmptyDescription>
            <EmptyButton href="/">
              <Btn>Go to catalog</Btn>
            </EmptyButton>
          </Box>
        </MainContainer>
      </MainWrapper>
    );
  }

  // function createData(title: string, total: number) {
  //   return { title, total };
  // }

  // const rows = [
  //   createData("Frozen yoghurt", 4.0),
  //   createData("Ice cream sandwich", 4.3),
  //   createData("Eclair", 6.0),
  //   createData("Cupcake", 4.3),
  //   createData("Gingerbread", 3.9),
  // ];

  // const rows = userStore.cart?.map((item) => {
  //   return {
  //     title: item.title,
  //     quantity: item.quantity,
  //     size: item.size,
  //     total: item.price,
  //     productId: item.product.id,
  //   };
  // });

  const totalPrice = userStore.cart?.reduce((accumulator, currentValue) => {
    return +accumulator + +currentValue.price;
  }, 0);

  return (
    <MainWrapper>
      <MainContainer
        sx={{ py: { xs: 3, md: 4, lg: 8 }, textAlign: "center" }}
        maxWidth="xl"
      >
        {/* {userStore.cart.map((item) => (
        <div>{item.title}</div>
      ))} */}
        <SectionHeading>Cart of goods</SectionHeading>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Title
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Size
                </TableCell>
                {/* <TableCell />
                <TableCell /> */}
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userStore.cart?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    // sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Stack direction="row" alignItems="center" spacing={3}>
                      <Stack direction="row" alignItems="center" spacing="2px">
                        <p>{row.title}</p>
                        <Typography component="span" color="#888888">
                          x{row.quantity}
                        </Typography>
                      </Stack>
                      <CartControlButtons
                        productId={row.product.id}
                        size={row.size}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>{row.size}</TableCell>
                  {/* <TableCell />
                  <TableCell /> */}
                  <TableCell align="right">{row.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Total
                </TableCell>
                {/* <TableCell />
                <TableCell /> */}
                {/* <TableCell /> */}
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                  colSpan={2}
                >
                  {totalPrice?.toFixed(2)} €
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </MainContainer>
    </MainWrapper>
  );
};

export default observer(CartPage);
