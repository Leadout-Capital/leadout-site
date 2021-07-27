import * as React from "react";
import Link from "./Link";
import { Helmet } from "react-helmet";
import NavPages from "../constants/NavPages";
import Logo from "../images/logo.svg";
import "../stylesheets/navbar-and-footer.scss";

export type NavLink = {
  title: string,
  to: string
}

const fixPath = (str: string) => str?.replaceAll("/", "");

const Navbar = ({ path }: { path: string }) => {
  const [top, setTop] = React.useState(true);
  const matchingPages = NavPages
    .map((page, index) => ({ ...page, index }))
    .filter(({ to }) => fixPath(path) === fixPath(to));
  const matchingPage = matchingPages.length > 0 ? matchingPages[0] : null;
  const pageTitle = matchingPage ? matchingPage.title : "404";

  const detectTop = () => setTop(pageYOffset <= 20);

  React.useEffect(() => {
    window.addEventListener("scroll", detectTop);
    return () => window.addEventListener("scroll", detectTop);
  }, []);

  return (
    <nav className={top ? "top" : ""}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{pageTitle} | Leadout Capital</title>
        {/*<link rel="canonical" href="http://mysite.com/example" />*/}
      </Helmet>
      <div className={"logo"}>
        <Logo />
      </div>
      <ul>
        {NavPages.map(({ title, to }, i) => (
          <li key={title}>
            <Link to={to} className={matchingPage && matchingPage.index === i ? "active" : ""}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
};

export default Navbar;