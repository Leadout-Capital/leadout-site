import * as React from "react";
import { graphql } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { ExecuteOnScroll } from "../components/OnScroll";
import DelayEach from "../components/DelayEach";
import "../stylesheets/porfolio.scss";

export type PortfolioCompany = Company | StealthCompany;

type QueryNode = {
  node: PortfolioCompany
}

type PortfolioProps = {
  data: {
    allContentfulPortfolioCompany: {
      edges: QueryNode[]
    }
  }
}

type Company = {
  name: string,
  image: { file: { url: string } },
  website: string,
  description: { childMarkdownRemark: { html: string } },
  stealth: false
}

type StealthCompany = {
  name?: string,
  image?: { file: { url: string } },
  website?: string,
  description?: { childMarkdownRemark: { html: string } },
  stealth: true
}

const Portfolio: React.FC<PortfolioProps> = ({ data }) => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const companiesRef = React.useRef<HTMLDivElement>();
  const companies = React.useMemo(() => data.allContentfulPortfolioCompany.edges.map(
    ({ node }) => node
  ), [data]);

  const scrollToCompanies = () => {
    if (!companiesRef.current) return;
    companiesRef.current.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" });
  };

  React.useEffect(() => {
    const checkDimensions = () => setIsMobile(window.innerWidth <= 500);
    checkDimensions();
    window.addEventListener("resize", checkDimensions);
    return () => window.removeEventListener("resize", checkDimensions);
  });

  return (
    <main className={"portfolio"}>
      <header>
        <h1>
          We look to identify, partner with, and support <span className={"highlight"}>non-obvious</span>,
          <span className={"highlight"}> under-represented</span> founders <span className={"highlight"}>early</span>.
        </h1>
        <h2>
          These founders are core to developing technology that expands access to capital, information and opportunity
          for
          overlooked markets and communities.
        </h2>
        <div className={"down-arrow"}>
          <FontAwesomeIcon icon={faChevronDown} className={"icon"} onClick={scrollToCompanies}/>
        </div>
      </header>
      {isMobile ? (
        <div className={"portfolio-companies"}>
          {companies.map((
            {
              name,
              image,
              website,
              description,
              stealth
            }) => (
            stealth ? (
              <div className={"company-wrapper"}>
                <ExecuteOnScroll key={name} className={"show-on-scroll company-background stealth"}/>
              </div>
            ) : (
              <div className={"company-wrapper"}>
                <ExecuteOnScroll
                  key={name}
                  className={"show-on-scroll company-background"}
                  style={{ backgroundImage: `url(https:${image.file.url})` }}
                >
                  <div className={"dark company-container"}>
                    <h3>{name}</h3>
                    <span dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
                    <a href={website} target={"_blank"}>Visit website</a>
                  </div>
                </ExecuteOnScroll>
              </div>
            )
          ))}
        </div>
      ) : (
        <ExecuteOnScroll className={"portfolio-companies"} ref={companiesRef}>
          <DelayEach
            useP={false}
            className={"company-wrapper"}
            delay={0.1}
            render={companies.map((
              {
                name,
                image,
                website,
                description,
                stealth
              }) => (
              stealth ? <div key={name} className={"company-background stealth"} /> : (
                <div key={name} className={"company-background"} style={{ backgroundImage: `url(https:${image.file.url})` }}>
                  <div className={"dark company-container"}>
                    <h3>{name}</h3>
                    <span dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
                    <a href={website} target={"_blank"}>Visit website</a>
                  </div>
                </div>
              )
            ))} />
        </ExecuteOnScroll>
      )}
    </main>
  )
};

export default Portfolio;

export const query = graphql`
  {
    allContentfulPortfolioCompany(
      filter: { node_locale: { eq: "en-US" } }
      sort: { fields: [index] }
    ) {
      edges {
        node {
          name
          image {
            file {
              url
            }
          }
          website
          description {
            childMarkdownRemark {
              html
            }
          }
          stealth
        }
      }
    }
  }
`;