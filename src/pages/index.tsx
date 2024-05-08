import Group from "@/components/Group/Group";
import { MainWrapper } from "@/components/MainWrapper/MainWrapper";
import SwiperProducts from "@/components/SwiperProducts/SwiperProducts";
import { REVALIDATION_TIME_MAIN_PAGE } from "@/consts";
import { E_Type, I_ProductCard, I_ProductsRes } from "@/types";
import Head from "next/head";
import { Message } from "./styled";

export async function getStaticProps() {
  const response = await fetch(
    process.env.REACT_APP_API_URL + "/products/favorites"
  );
  // TODO add error handling
  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`)
  // }

  const products: I_ProductsRes = await response.json();

  const productsList = {
    sneakers: products.data.filter((item) => item.type === E_Type.sneakers),
    boots: products.data.filter((item) => item.type === E_Type.boots),
    slippers: products.data.filter((item) => item.type === E_Type.slippers),
  };

  return {
    props: {
      lists: [
        {
          title: "Sneakers",
          products: productsList.sneakers,
        },
        {
          title: "Boots",
          products: productsList.boots,
        },
        {
          title: "Slippers",
          products: productsList.slippers,
        },
      ],
    },
    revalidate: REVALIDATION_TIME_MAIN_PAGE,
  };
}

interface I_HomePageProps {
  lists: [
    {
      title: string;
      products: I_ProductCard[];
    }
  ];
}

const Home: React.FC<I_HomePageProps> = (props) => {
  return (
    <>
      <Head>
        <title>Main Page</title>
        <meta name="description" content="Main Page of shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainWrapper>
        {props.lists.map((list, index) => (
          <Group title={list.title} key={index}>
            {list.products.length !== 0 ? (
              <SwiperProducts productsList={list.products} />
            ) : (
              <Message>Empty</Message>
            )}
          </Group>
        ))}
      </MainWrapper>
    </>
  );
};

export default Home;
