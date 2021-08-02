import * as React from "react";
import { graphql } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { ExecuteOnScroll } from "../components/OnScroll";
import DelayEach from "../components/DelayEach";
import "../stylesheets/porfolio.scss";

type PortfolioCompanyProps = {
  name: string,
  description: LongTextQuery,
  website: string
}

type PortfolioProps = {
  data: {
    companies: {
      edges: QueryNode<ContentfulPortfolioCompany>[]
    },
    header: ContentfulTextField,
    stealthImage: ContentfulImageField
  }
};

const PortfolioCompany: React.FC<PortfolioCompanyProps> = ({ name, description, website }) => (
  <div className={"dark company-container"}>
    <h3>{name}</h3>
    <span dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
    <a href={website} target={"_blank"}>Visit website</a>
  </div>
);

const Portfolio: React.FC<PortfolioProps> = ({ data }) => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const companiesRef = React.useRef<HTMLDivElement>();
  const companies = React.useMemo(() => data.companies.edges.map(
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
        <span dangerouslySetInnerHTML={{ __html: data.header.body.childMarkdownRemark.html }} />
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
                <ExecuteOnScroll key={name} className={"show-on-scroll company-background stealth"} />
              </div>
            ) : (
              <div className={"company-wrapper"}>
                <ExecuteOnScroll
                  key={name}
                  className={"show-on-scroll company-background"}
                  style={{ backgroundImage: `url(https:${image.file.url})` }}
                >
                  <PortfolioCompany name={name} description={description} website={website} />
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
              stealth ? (
                <div
                  key={name}
                  className={"company-background"}
                  style={{ backgroundImage: `url(https:${data.stealthImage.image.file.url})` }}
                />
              ) : (
                <div key={name} className={"company-background"} style={{ backgroundImage: `url(https:${image.file.url})` }}>
                  <PortfolioCompany name={name} description={description} website={website} />
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
  query {
    companies: allContentfulPortfolioCompany(
      filter: { node_locale: { eq: "en-US" } }
      sort: { fields: [stealth, index] }
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
    header: contentfulTextField(name: { eq: "Portfolio Header" }) {
      body {
        childMarkdownRemark {
          html
        }
      }
    }
    stealthImage: contentfulImageField(name: { eq: "Stealth Company" }) {
      image {
        file {
          url
        }
      }
    }
  }
`;