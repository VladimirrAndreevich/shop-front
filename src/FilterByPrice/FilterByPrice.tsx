import FilterHeading from "@/components/FilterHeading/FilterHeading";
import { Box, Grid, Slider, SliderThumb, Stack, styled } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

function valuetext(value: number) {
  return `${value}°C`;
}

const minDistance = 10;

const ValueBox: React.FC<{ num: number }> = ({ num }) => {
  return (
    <Box
      sx={{
        color: "#67708A",
        backgroundColor: "#d9d9d9",
        p: "6px",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {num}
    </Box>
  );
};

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}

function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

type FilterByPriceProps = {
  value: number[];
  setValue: Dispatch<SetStateAction<number[]>>;
};

const FilterByPrice: React.FC<FilterByPriceProps> = ({ value, setValue }) => {
  // const [value, setValue] = useState<number[]>([100, 3000]);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <Box>
      <FilterHeading>Filter by price</FilterHeading>

      <Grid container alignItems="center" mt={2}>
        <Grid item xs={5}>
          <ValueBox num={value[0]} />
        </Grid>
        <Grid item xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          -
        </Grid>
        <Grid item xs={5}>
          <ValueBox num={value[1]} />
        </Grid>
      </Grid>
      <AirbnbSlider
        sx={{ mt: 1 }}
        getAriaLabel={() => "Minimum distance"}
        value={value}
        min={10}
        max={6000}
        onChange={handleChange}
        // valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        slots={{ thumb: AirbnbThumbComponent }}
      />
    </Box>
  );
};

export default FilterByPrice;

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: "#49D0FF",
  height: 4,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid #49D0FF",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "#49D0FF",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3,
  },
}));
