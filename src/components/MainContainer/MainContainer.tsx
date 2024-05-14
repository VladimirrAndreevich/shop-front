import { Breakpoint, Container, SxProps, Theme } from "@mui/material";

type MainContainerProps = {
  children: React.ReactNode | string;
  sx?: SxProps<Theme>;
  maxWidth?: false | Breakpoint | undefined;
};

const MainContainer: React.FC<MainContainerProps> = ({
  children,
  sx = [],
  maxWidth,
}) => {
  return (
    <Container
      maxWidth={maxWidth ? maxWidth : "xl"}
      sx={[{ px: "10px" }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {children}
    </Container>
  );
};

export default MainContainer;
