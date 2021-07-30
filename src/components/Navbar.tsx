import * as React from "react";
import Link, { TRANSITION_DURATION } from "./Link";
import { Helmet } from "react-helmet";
import NavPages from "../constants/NavPages";
import Logo from "../images/logo.svg";
import "../stylesheets/navbar-and-footer.scss";

const LINK_DELAY = 0.2;

export type NavLink = {
  title: string,
  to: string
};

type NavbarProps = {
  path: string
}

const fixPath = (str: string) => str?.replaceAll("/", "");

const MobileMenuButton = ({ onClick, open }) => (
  <button className={"close-button " + (open ? "open" : "")} onClick={onClick}>
    <span className={"line top"} />
    <span className={"line center"} />
    <span className={"line bottom"} />
  </button>
)

const Navbar: React.FC<NavbarProps> = ({ path }) => {
  const [top, setTop] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState<boolean>(false);

  const matchingPages = NavPages
    .map((page, index) => ({ ...page, index }))
    .filter(({ to }) => fixPath(path) === fixPath(to));
  const matchingPage = matchingPages.length > 0 ? matchingPages[0] : null;
  const pageTitle = matchingPage ? matchingPage.title : "404";

  const closeDuringTransition = () => {
    setTimeout(() => setOpen(false), TRANSITION_DURATION / 2 * 1000);
  };

  React.useEffect(() => {
    const detectTop = () => setTop(pageYOffset <= 20);
    detectTop();
    window.addEventListener("scroll", detectTop);
    return () => window.removeEventListener("scroll", detectTop);
  }, []);

  return (
    <nav className={top ? "top" : ""}>
      <Helmet bodyAttributes={{ class: open ? "open" : "" }}>
        <meta charSet="utf-8" />
        <title>{pageTitle} | Leadout Capital</title>
        {/*<link rel="canonical" href="http://mysite.com/example" />*/}
      </Helmet>
      <div className={"logo"}>
        <Logo />
      </div>
      <MobileMenuButton onClick={() => setOpen(!open)} open={open} />
      <ul className={open ? "open" : ""}>
        {NavPages.map(({ title, to }, i) => (
          <li key={title} style={open ? { transition: `all 0.5s ease ${LINK_DELAY * i}s` } : { transition: `all 0.2s ease 0.2s` }}>
            <Link
              to={to}
              className={(matchingPage?.index === i ? "active" : "")}
              onClick={closeDuringTransition}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
};

export default Navbar;