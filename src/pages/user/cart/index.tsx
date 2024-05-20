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
import { Box, CircularProgress, Divider, Grid } from "@mui/material";
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
        <Grid container sx={{ fontWeight: "bold" }}>
          <Grid xs={3} item>
            Item
          </Grid>
          <Grid xs={3} item>
            Size
          </Grid>
          <Grid xs={3} item>
            Qut
          </Grid>
          <Grid xs={3} item>
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
                {item.price} €
              </Grid>
            </Grid>
          </>
        ))}
      </MainContainer>
    </MainWrapper>
  );
};

export default observer(CartPage);
