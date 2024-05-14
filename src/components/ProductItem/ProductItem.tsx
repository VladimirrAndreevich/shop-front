import { I_ProductCard } from "@/types";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import colors from "@/consts/colors";

interface I_ProductItemProps {
  data: I_ProductCard;
}

const ProductItem: React.FC<I_ProductItemProps> = ({ data }) => {
  const { id, title, price, priceDiscounted, mainImage } = data;
  const router = useRouter();

  return (
    <Card elevation={0}>
      <CardActionArea onClick={() => router.push(`/products/${id}`)}>
        <CardMedia
          sx={{
            height: { xs: "160px", sm: "220px", md: "280px", xl: "310px" },
            backgroundSize: "contain",
          }}
          image={`${process.env.API_URL_IMAGES}/${mainImage}`}
          title={`Image of ${title}`}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="p"
            sx={{
              fontSize: { xs: "18px", sm: "26px" },
              color: colors.primary,
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>

          {/* <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "#3C3C3C", fontSize: "16px" }}
          >
            {Math.ceil(price)} $
          </Typography>
          {priceDiscounted && (
            <Typography
              variant="body2"
              color="text.secondary"
              component="span"
              sx={{
                color: "#3C3C3C",
                textDecoration: "line-through",
                fontSize: "12px",
              }}
            >
              {Math.ceil(priceDiscounted)} $
            </Typography>
          )} */}
          <Stack direction="row" spacing="10px" alignItems="center">
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "16px", sm: "20px", md: "24px" },
              }}
            >
              {price} €
            </Typography>
            {priceDiscounted && (
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "12px", sm: "12px", md: "18px" },
                  color: "#7B7B7B",
                  textDecoration: "line-through",
                }}
              >
                {priceDiscounted} €
              </Typography>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductItem;
