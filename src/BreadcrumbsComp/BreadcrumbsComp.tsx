import { Breadcrumbs, Link, Typography } from "@mui/material";

type BreadcrumbsComp = {
  crumbs: { text: string; link?: string }[];
};

const BreadcrumbsComp: React.FC<BreadcrumbsComp> = ({ crumbs }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ py: { xs: 2, md: 3 } }}>
      {crumbs.map((item, index) => {
        const color = index === crumbs.length - 1 ? "text.primary" : "inherit";

        if (item.link) {
          return (
            <Link
              key={index}
              underline="hover"
              color={color}
              href={`${item.link}`}
              fontSize={{ md: "22px" }}
            >
              {item.text}
            </Link>
          );
        }

        return (
          <Typography key={index} color={color} fontSize={{ md: "22px" }}>
            {item.text}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComp;
