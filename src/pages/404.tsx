import * as React from "react"
import Link from "../components/Link";
import "../stylesheets/404.scss";

const NotFoundPage = () => (
  <main className={"not-found"}>
    <header>
      <h1>404: Page not found</h1>
      <p>
        We couldn't find the page you were looking for. Click <Link to={"/"}>here</Link> to return home.
      </p>
    </header>
  </main>
);

export default NotFoundPage
