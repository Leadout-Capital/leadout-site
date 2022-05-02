import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Link, { TRANSITION_DURATION } from "./Link";
import { Helmet } from "react-helmet";
import "../stylesheets/navbar-and-footer.scss";

const LINK_DELAY = 0.2;

type NavbarProps = {
  path: string
  pageContext: {
    title: string;
  }
}

type QueryData = {
  navLinks: {
    edges: QueryNode<ContentfulNavLink>[]
  },
  favicon: ContentfulFavicon,
  logo: ContentfulImageField
}

const fixPath = (str: string) => str?.replaceAll("/", "");

const MobileMenuButton = ({ onClick, open }) => (
  <button className={"close-button " + (open ? "open" : "")} onClick={onClick}>
    <span className={"line top"} />
    <span className={"line center"} />
    <span className={"line bottom"} />
  </button>
)

const Navbar: React.FC<NavbarProps> = ({ path, pageContext }) => {
  const data: QueryData = useStaticQuery(graphql`
    query NavbarQuery {
      navLinks: allContentfulNavLink(
        filter: { node_locale: { eq: "en-US" } }
        sort: { fields: [index] }
      ) {
        edges {
          node {
            title
            to
          }
        }
      }
      favicon: contentfulFavicon(name: { eq: "Favicon" }) {
        image {
          file {
            url
          }
        }
      }
      logo: contentfulImageField(name: { eq: "Logo" }) {
        image {
          file {
            url
          }
        }
      }
    }
  `);

  const [top, setTop] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const navLinks = React.useMemo(() => data.navLinks.edges.map(({ node }) => node), [data]);

  const matchingPages = navLinks
    .map((page, index) => ({ ...page, index }))
    .filter(({ to }) => fixPath(path) === fixPath(to));
  const matchingPage = matchingPages.length > 0 ? matchingPages[0] : null;
  const pageTitle = matchingPage?.title || pageContext?.title || "404";

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
        <link rel={"icon"} href={data.favicon.image.file.url} />
      </Helmet>
      <Link to="/" className={"logo"}>
        <img src={data.logo.image.file.url} alt={"Leadout Capital logo"} />
      </Link>
      <MobileMenuButton onClick={() => setOpen(!open)} open={open} />
      <ul className={open ? "open" : ""}>
        {navLinks.map(({ title, to }, i) => (
          title !== 'Home' && <li
            key={title}
            style={open ? { transition: `all 0.5s ease ${LINK_DELAY * i}s` } : { transition: `all 0.2s ease 0.2s` }}
          >
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
