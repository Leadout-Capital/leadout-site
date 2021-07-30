import * as React from "react";
import Navbar from "./src/components/Navbar";
import Footer from "./src/components/Footer";
import "./src/stylesheets/global.scss";

export const wrapPageElement = ({ element, props }) => (
  <div>
    <Navbar {...props} />
    {element}
    <Footer {...props} />
  </div>
);