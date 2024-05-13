import { Swiper, SwiperSlide } from "swiper/react";

import { I_ProductCard } from "@/types";
import "swiper/css";
import ProductItem from "../ProductItem/ProductItem";
import { useTheme } from "@mui/material";

interface I_SwiperProductsProps {
  productsList: I_ProductCard[];
}

const SwiperProducts: React.FC<I_SwiperProductsProps> = ({ productsList }) => {
  if (!productsList) {
    return <div>Empty</div>;
  }

  const theme = useTheme();

  return (
    <Swiper
      breakpoints={{
        [theme.breakpoints.values.xs]: {
          spaceBetween: 20,
          slidesPerView: 2,
        },
        [theme.breakpoints.values.sm]: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        [theme.breakpoints.values.md]: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        [theme.breakpoints.values.lg]: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
    >
      {productsList.map((item, index) => (
        <SwiperSlide key={index}>
          <ProductItem data={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperProducts;
