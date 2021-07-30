import * as React from "react";
import { ExecuteOnScroll } from "../components/OnScroll";
import DelayEach from "../components/DelayEach";
import { CoreValues, TeamBenefits } from "../constants/Values";
import "../stylesheets/values.scss";
import {graphql} from "gatsby";

export type Benefit = {
  title: string,
  body: string
}

type CoreValueQueryNode = {
  node: {
    body: {
      childMarkdownRemark: {
        html: string
      }
    }
  }
};

type TeamBenefitQueryNode = {
  node: {
    title,
    body: {
      childMarkdownRemark: {
        html: string
      }
    }
  }
}

type ValuesProps = {
  data: {
    coreValues: {
      edges: CoreValueQueryNode[]
    },
    teamBenefits: {
      edges: TeamBenefitQueryNode[]
    }
  }
}

const Values: React.FC<ValuesProps> = ({ data }) => {
  // const coreValues = React.useMemo(() => data.coreValues.edges.map(({ node }) => node.body.childMarkdownRemark.html), [data]);
  // const teamBenefits = React.useMemo(() => data.teamBenefits.edges.map(({ node: { title, body } }) => ({ title: title.childMarkdownRemark.html, body: body.childMarkdownRemark.html })), [data]);
  return (
    <main className={"values"}>
      <ExecuteOnScroll className={"header section core"}>
        <h1>Our Core Fund Values</h1>
        <DelayEach
          className={"content"}
          render={CoreValues}
          asString
          useP={true}
        />
      </ExecuteOnScroll>
      <div className={"section working-with-leadout"}>
        <h1>Working with Leadout</h1>
        <div className={"content"}>
          {TeamBenefits.map(({ title, body }) => (
            <ExecuteOnScroll key={title} className={"show-on-scroll"} bottom={150}>
              <h2>{title}</h2>
              <p dangerouslySetInnerHTML={{ __html: body }} />
            </ExecuteOnScroll>
          ))}
        </div>
      </div>
    </main>
  )
};

export default Values;

export const query = graphql`
  query {
    coreValues: allContentfulCoreValue(
      filter: { node_locale: { eq: "en-US" } }
      sort: { fields: [index] }
    ) {
      edges {
        node {
          body {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    teamBenefits: allContentfulTeamBenefit(
      filter: { node_locale: { eq: "en-US" } }
      sort: { fields: [index] }
    ) {
      edges {
        node {
          title
          body {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;