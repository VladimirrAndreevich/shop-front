import { MainWrapper } from "@/components/MainWrapper/MainWrapper";
import {
  ContentWrapper,
  EmptyButton,
  EmptyDescription,
  EmptyHeading,
} from "./styled";
import Button from "@/components/Btn/Btn";
import Image from "next/image";
import { ImageDecor } from "@/components/ImageDecor/ImageDecor";
import { getStoreInstance } from "@/store/user-store";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CartPage: React.FC = () => {
  const router = useRouter();
  const userStore = getStoreInstance();

  useEffect(() => {
    if (!userStore.isLogged) {
      router.push("/user/login");
    }
  }, []);

  if (!userStore.cart) {
    return (
      <MainWrapper>
        <ContentWrapper>
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
            <Button>Go to catalog</Button>
          </EmptyButton>
        </ContentWrapper>
      </MainWrapper>
    );
  }

  return (
    <MainWrapper>
      {userStore.cart.map((item) => (
        <div>{item.title}</div>
      ))}
    </MainWrapper>
  );
};

export default observer(CartPage);
