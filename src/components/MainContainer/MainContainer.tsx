import { Container, SxProps, Theme } from "@mui/material";

type MainContainerProps = {
  children: React.ReactNode | string;
  sx?: SxProps<Theme>;
};

const MainContainer: React.FC<MainContainerProps> = ({ children, sx = [] }) => {
  return (
    <Container
      maxWidth="xl"
      sx={[{ px: "10px" }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {children}
    </Container>
  );
};

export default MainContainer;
