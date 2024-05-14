import { Typography } from "@mui/material";

type SectionHeadingTypes = {
  children: React.ReactNode | string;
};

const SectionHeading: React.FC<SectionHeadingTypes> = ({ children }) => {
  return (
    <Typography
      variant="h2"
      sx={{
        textAlign: "left",
        fontSize: { xs: "25px", md: "30px", lg: "35px" },
        textTransform: "uppercase",
        fontWeight: "bold",
        mb: { xs: "30px", md: "60px", lg: "40px" },
      }}
    >
      {children}
    </Typography>
  );
};

export default SectionHeading;
