import { I_ProductCard } from "@/types";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
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
          <Typography
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
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductItem;
