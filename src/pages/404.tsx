import { NextPage } from "next";
import { Error } from "@/components";
import { Fragment } from "react";

const Custom404Page: NextPage = () => {
  return (
    <Fragment>
      <Error title="404"/>
    </Fragment>
  );
};

export default Custom404Page;
