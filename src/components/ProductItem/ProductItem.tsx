import { I_ProductCard } from "@/types";
import Image from "next/image";
import { ImageWrapper } from "./styled";
import { Price } from "../Group/styled";

interface I_ProductItemProps {
  data: I_ProductCard;
}

const ProductItem: React.FC<I_ProductItemProps> = ({ data }) => {
  const { title, price } = data;

  return (
    <div>
      <ImageWrapper>
        <Image src="/dummy.jpg" alt="Item image" fill priority />
      </ImageWrapper>

      <h3>{title}</h3>
      {/* TODO separate price 9999 $ => 9 999 $ */}
      <div>
        <Price>{price} $</Price>{" "}
        {data?.priceDiscounted && (
          <Price $discounted>{data.priceDiscounted} $</Price>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
