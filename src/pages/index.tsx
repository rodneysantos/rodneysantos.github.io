import type { HeadFC, PageProps } from "gatsby";
import React from "react";
import Main from "../containers/main";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Main />
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
