import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SizesItem, SizesList } from "./style";
import { Box, Grid, Typography } from "@mui/material";
import colors from "@/consts/colors";

const sizes = {
  start: 36,
  end: 44.5,
};

type SizesProps = {
  changeSize: Dispatch<SetStateAction<number>>;
};

const Sizes: React.FC<SizesProps> = ({ changeSize }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  let sizesList: number[] = [];

  for (let i = sizes.start; i <= sizes.end; i += 0.5) {
    sizesList.push(i);
  }

  useEffect(() => {
    changeSize(sizesList[activeIndex]);
  }, [activeIndex]);

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          fontSize: "20px",
          textTransform: "uppercase",
        }}
      >
        EU sizes:
      </Typography>

      <Grid
        container
        columns={10}
        spacing="5px"
        // sx={{ marginTop: { xs: "13px", md: "20px" } }}
        marginTop={{ xs: "5px" }}
      >
        {sizesList.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <Grid
              item
              xs={2}
              key={index}
              onClick={() => setActiveIndex(index)}
              // $active={index === activeIndex}
            >
              <Box
                sx={{
                  border: isActive
                    ? `1px solid ${colors.accent}`
                    : "1px solid #7B7B7B",
                  backgroundColor: isActive ? `${colors.accent}` : "none",
                  borderRadius: "4px",
                  py: "8px",
                  textAlign: "center",
                  color: isActive ? "white" : `${colors.primary}`,
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                {item}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Sizes;
