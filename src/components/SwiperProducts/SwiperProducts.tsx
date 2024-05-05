import { Swiper, SwiperSlide } from "swiper/react";

import { I_ProductCard } from "@/types";
import "swiper/css";
import ProductItem from "../ProductItem/ProductItem";

interface I_SwiperProductsProps {
  productsList: I_ProductCard[];
}

const SwiperProducts: React.FC<I_SwiperProductsProps> = ({ productsList }) => {
  if (!productsList) {
    return <div>Empty</div>;
  }

  return (
    <Swiper spaceBetween={20} slidesPerView={2}>
      {productsList.map((item, index) => (
        <SwiperSlide key={index}>
          <ProductItem data={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperProducts;
