import { Box, Grid, Typography } from "@mui/material";
import FilterHeading from "../FilterHeading/FilterHeading";
import { Dispatch, SetStateAction } from "react";

type FilterByColorProps = {
  colors: string[];
  setIndexColor: Dispatch<SetStateAction<number | undefined>>;
  activeIndexColor: number | undefined;
};

const FilterByColor: React.FC<FilterByColorProps> = ({
  colors,
  setIndexColor,
  activeIndexColor,
}) => {
  return (
    <Box pt={2}>
      <FilterHeading>Filter by color</FilterHeading>
      <Grid container mt={2} spacing="20px">
        {colors.map((color, index) => (
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              rowGap: "6px",
            }}
            key={index}
            onClick={() => {
              if (activeIndexColor === index) {
                setIndexColor(undefined);
              } else {
                setIndexColor(index);
              }
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: 27,
                height: 27,
                borderRadius: "50%",

                backgroundColor: color,

                "&::after": {
                  content: activeIndexColor === index ? '""' : null,
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  top: 0,
                  border: "1px solid black",
                  borderRadius: "50%",
                  transform: "scale(1.2)",
                },
              }}
            />
            <Typography fontSize={13} textTransform="capitalize">
              {color}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FilterByColor;
