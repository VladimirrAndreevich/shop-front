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
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CartControlButtons from "@/features/CartControlButtons/CartControlButtons";
import LoadingBtn from "@/components/LoadingBtn/LoadingBtn";

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

  const totalPrice = userStore.cart?.reduce((accumulator, currentValue) => {
    return +accumulator + +currentValue.price;
  }, 0);

  return (
    <MainWrapper>
      <MainContainer
        sx={{ py: { xs: 3, md: 4, lg: 8 }, textAlign: "center" }}
        maxWidth="xl"
      >
        <SectionHeading>Cart of goods</SectionHeading>

        <Grid container columnSpacing={4}>
          <Grid item xs={8}>
            <Grid container sx={{ fontWeight: "bold" }}>
              <Grid xs={6} item>
                Item
              </Grid>
              <Grid xs={2} item>
                Size
              </Grid>
              <Grid xs={2} item>
                Qut
              </Grid>
              <Grid xs={2} item>
                Price
              </Grid>
            </Grid>
            {userStore.cart?.map((item, index) => (
              <>
                <Divider sx={{ backgroundColor: "#cacdd8", my: 2 }} />
                <Grid container key={index} alignItems="center">
                  <Grid xs={3} item>
                    <Image
                      src={`${process.env.API_URL_IMAGES}/${item.product.mainImage}`}
                      alt={`Image of ${item.title}`}
                      width={100}
                      height={100}
                    />
                  </Grid>
                  <Grid xs={3} item>
                    {item.title}
                  </Grid>
                  <Grid xs={2} item>
                    {item.size}
                  </Grid>
                  <Grid xs={2} item>
                    <CartControlButtons
                      size={item.size}
                      productId={item.product.id}
                    >
                      {item.quantity}
                    </CartControlButtons>
                  </Grid>
                  <Grid xs={2} item>
                    {Math.round(item.price)} €
                  </Grid>
                </Grid>
              </>
            ))}
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h4" fontSize={22} textAlign="left">
              Summary
            </Typography>
            <Divider sx={{ backgroundColor: "#cacdd8", my: 2 }} />
            <Stack direction="row" justifyContent="space-between">
              <span>Order Total</span>
              <span>{totalPrice} €</span>
            </Stack>

            <LoadingBtn sx={{ width: "100%" }}>Proceed to Checkout</LoadingBtn>
          </Grid>
        </Grid>
      </MainContainer>
    </MainWrapper>
  );
};

export default observer(CartPage);
