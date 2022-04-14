import * as React from "react";
import { ExecuteOnScroll } from "../components/OnScroll";
import DelayEach from "../components/DelayEach";
import "../stylesheets/values.scss";
import { graphql } from "gatsby";
import { FAQs } from "../components/FAQs";

export type Benefit = {
  title: string,
  body: string
}

type ValuesProps = {
  data: {
    coreValues: {
      edges: QueryNode<ContentfulCoreValue>[]
    },
    teamBenefits: {
      edges: QueryNode<ContentfulTeamBenefit>[]
    },
    coreValuesTitle: ContentfulTextField,
    teamBenefitsTitle: ContentfulTextField,
    faqs: {
      nodes: Array<faq>,
    }
  }
};

const Values: React.FC<ValuesProps> = ({ data }) => {
  const coreValues = React.useMemo(() => data.coreValues.edges.map(({ node }) => node.body.childMarkdownRemark.html), [data]);
  const teamBenefits = React.useMemo(() => data.teamBenefits.edges.map(({ node: { title, body } }) => ({ title, body: body.childMarkdownRemark.html })), [data]);
  const faqs = React.useMemo(() => data.faqs.nodes.map(({ question, answer }) => ({ question, answer: answer.childMarkdownRemark.html })), [data]);

  return (
    <main className={"values"}>
      <ExecuteOnScroll className={"header section core"}>
        <h2>{data.coreValuesTitle.body.childMarkdownRemark.rawMarkdownBody}</h2>
        <DelayEach
          className={"content"}
          render={coreValues}
          asString
          useP={true}
        />
      </ExecuteOnScroll>
      <div className={"section working-with-leadout"}>
        <h2>{data.teamBenefitsTitle.body.childMarkdownRemark.rawMarkdownBody}</h2>
        <div className={"content"}>
          {teamBenefits.map(({ title, body }) => (
            <ExecuteOnScroll key={title} className={"show-on-scroll"} bottom={150}>
              <h3>{title}</h3>
              <p dangerouslySetInnerHTML={{ __html: body }} />
            </ExecuteOnScroll>
          ))}
        </div>
      </div>
      <FAQs faqs={faqs} />
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
    coreValuesTitle: contentfulTextField(name: { eq: "Core Values Title" }) {
      body {
        childMarkdownRemark {
          html
          rawMarkdownBody
        }
      }
    }
    teamBenefitsTitle: contentfulTextField(name: { eq: "Team Benefits Title" }) {
      body {
        childMarkdownRemark {
          html
          rawMarkdownBody
        }
      }
    }
    faqs: allContentfulFrequentlyAskedQuestion(filter: {node_locale: {eq: "en-US"}}) {
    nodes {
      id
      question
      answer {
        childMarkdownRemark {
          html
        }
      }
    }
  }
  }
`;
