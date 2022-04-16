import * as React from "react";
import { graphql } from "gatsby";
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
      </header>
      <div className="portfolio-grids">
        <PortfolioGrid isMobile={isMobile} companies={companies} companiesRef={companiesRef} stealthImage={data.stealthImage} sectionTitle="Companies" />
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
      }
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
