import { MainWrapper } from "@/components/MainWrapper/MainWrapper";
import {
  ContentWrapper,
  EmptyButton,
  EmptyDescription,
  EmptyHeading,
} from "./styled";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { ImageDecor } from "@/components/ImageDecor/ImageDecor";

const CartPage: React.FC = () => {
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
          Before you proceed to checkout, you must add some items to your cart.
          On the Catalog page you will find many interesting products.
        </EmptyDescription>
        <EmptyButton href="/">
          <Button>Go to catalog</Button>
        </EmptyButton>
      </ContentWrapper>
    </MainWrapper>
  );
};

export default CartPage;
