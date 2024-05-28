export const paths: { [k: string]: string } = {
  main: "/",
};

export const breadcrumbsPaths: {
  [k: string]: { text: string; link?: string }[];
} = {
  catalog: [
    {
      text: "Main",
      link: paths.main,
    },
    {
      text: "Catalog",
    },
  ],
  detail: [
    {
      text: "Main",
      link: paths.main,
    },
    {
      text: "Catalog",
    },
    {
      text: "Shoes",
    },
  ],
};
