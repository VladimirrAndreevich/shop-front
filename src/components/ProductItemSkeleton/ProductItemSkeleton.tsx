import colors from "@/consts/colors";
import {
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

const ProductItemSkeleton: React.FC = () => {
  return (
    <Card elevation={0}>
      <Skeleton
        variant="rectangular"
        sx={{ height: { xs: "160px", sm: "220px", md: "280px", xl: "310px" } }}
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
          <Skeleton variant="rounded" />
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "16px", sm: "20px", md: "24px" },
          }}
        >
          <Skeleton variant="rounded" />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductItemSkeleton;
