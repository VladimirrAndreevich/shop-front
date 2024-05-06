import { MainWrapper } from "@/components/MainWrapper/MainWrapper";
import { E_Type, I_ProductCard, I_ProductsByTypeRes } from "@/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { CardContainer } from "./styled";
import ProductItem from "@/components/ProductItem/ProductItem";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { type: E_Type.sneakers } },
      { params: { type: E_Type.boots } },
      { params: { type: E_Type.slippers } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CatalogPageProps> = async ({
  params,
}) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const type = params.type as E_Type;

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/products/by-type?type=${type}`
  );

  const formattedResponse: I_ProductsByTypeRes = await response.json();

  return {
    props: {
      products: formattedResponse.data.products,
      amount: formattedResponse.data.amount,
      typeShoes: type,
    },
    revalidate: 3600,
  };
};

interface CatalogPageProps {
  products: I_ProductCard[];
  amount: number;
  typeShoes: E_Type;
}

const CatalogPage: React.FC<CatalogPageProps> = (props) => {
  const { products, amount } = props;

  return (
    <MainWrapper>
      <CardContainer>
        {products.map((item) => (
          <ProductItem data={item} />
        ))}
      </CardContainer>
    </MainWrapper>
  );
};

export default CatalogPage;
