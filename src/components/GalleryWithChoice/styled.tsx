import colors from "@/consts/colors";
import { Box, Grid } from "@mui/material";
import styled from "styled-components";

type DecorationActiveImage = {
  activeImage: number;
  images: string[];
};

const DecorationActiveImage: React.FC<DecorationActiveImage> = ({
  activeImage,
  images,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          backgroundColor: colors.third,
          zIndex: -1,
        },
      }}
    >
      <Grid container spacing="12px">
        {images.map((_, index) => {
          const isActive = index == activeImage;

          return (
            <Grid item xs={4}>
              <Box
                sx={{
                  height: "2px",
                  backgroundColor: isActive ? colors.accent : "none",
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default DecorationActiveImage;
