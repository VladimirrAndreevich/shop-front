import { I_ProductCard } from "@/types";
import Image from "next/image";
import { ImageWrapper } from "./styled";
import { Price } from "../Group/styled";
import Link from "next/link";

interface I_ProductItemProps {
  data: I_ProductCard;
}

const ProductItem: React.FC<I_ProductItemProps> = ({ data }) => {
  const { id, title, price, mainImage } = data;

  return (
    <Link href={`/products/${id}`}>
      <ImageWrapper>
        <Image
          src={`${process.env.API_URL_IMAGES}/${mainImage}`}
          alt="Item image"
          fill
          priority
        />
      </ImageWrapper>

      <h3>{title}</h3>
      {/* TODO separate price 9999 $ => 9 999 $ */}
      <div>
        <Price>{price} $</Price>{" "}
        {data?.priceDiscounted && (
          <Price $discounted>{data.priceDiscounted} $</Price>
        )}
      </div>
    </Link>
  );
};

export default ProductItem;
