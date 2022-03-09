import * as React from "react";
import { graphql } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "../stylesheets/porfolio.scss";
import { PortfolioGrid } from "../components/PortfolioGrid";

type PortfolioProps = {
  data: {
    companies: {
      edges: QueryNode<ContentfulPortfolioCompany>[]
    },
    alumni: {
      edges: QueryNode<ContentfulPortfolioCompany>[]
    },
    involved: {
      edges: QueryNode<ContentfulPortfolioCompany>[]
    },
    header: ContentfulTextField,
    stealthImage: ContentfulImageField
  }
};

const Portfolio: React.FC<PortfolioProps> = ({ data }) => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const companiesRef = React.useRef<HTMLDivElement>();
  const companies = React.useMemo(() => data.companies.edges.map(
    ({ node }) => node
  ), [data]);
  const alumni = React.useMemo(() => data.alumni.edges.map(
    ({ node }) => node
  ), [data]);
  const involved = React.useMemo(() => data.involved.edges.map(
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
      <div className="portfolio-grids">
        <PortfolioGrid isMobile={isMobile} companies={companies} companiesRef={companiesRef} stealthImage={data.stealthImage} sectionTitle="Companies" />
        {/* <PortfolioGrid isMobile={isMobile} companies={alumni} companiesRef={null} stealthImage={data.stealthImage} sectionTitle="Alumni" /> */}
        {/* <PortfolioGrid isMobile={isMobile} companies={involved} companiesRef={null} stealthImage={data.stealthImage} sectionTitle="Companies we are involved with" /> */}
      </div>
    </main>
  )
};

export default Portfolio;

export const query = graphql`
  query {
    companies: allContentfulPortfolioCompany(
      filter: {
        node_locale: {eq: "en-US"},
        # alumni: {ne: true}, involved: {ne: true}
      }
      sort: { fields: [stealth, index] }
    ) {
      edges {
        node {
          name
          alumni
          image {
            file {
              url
            }
          }
          website
          jobs
          description {
            childMarkdownRemark {
              html
            }
          }
          stealth
        }
      }
    }
    alumni: allContentfulPortfolioCompany(
      filter: {node_locale: {eq: "en-US"}, alumni: {eq: true}, involved: {ne: true}}
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
          jobs
          description {
            childMarkdownRemark {
              html
            }
          }
          stealth
        }
      }
    }
    involved: allContentfulPortfolioCompany(
      filter: {node_locale: {eq: "en-US"}, alumni: {ne: true}, involved: {eq: true}}
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
          jobs
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
