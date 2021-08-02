import * as React from "react";
import { ExecuteOnScroll } from "../components/OnScroll";
import DelayEach from "../components/DelayEach";
import "../stylesheets/team.scss";
import {graphql} from "gatsby";

const DURATION = 0.75;
const DELAY = 0.3;

export type Bio = {
  image: string,
  description: string[],
  role: string,
  name: string
}

type TeamProps = {
  data: {
    teamMembers: {
      edges: QueryNode<ContentfulTeamMember>[]
    },
    communityBlurb: ContentfulTextField
  }
}

const splitByParagraph = (text: string) => (
  text.replace("<p>", "").split("</p>").map((paragraph) => paragraph.trim())
);

const Team: React.FC<TeamProps> = ({ data }) => {
  const teamBios = React.useMemo(() => data.teamMembers.edges.map(({ node }) => ({
    ...node,
    description: splitByParagraph(node.description.childMarkdownRemark.html)
  })), [data]);
  const scrollRef = React.useRef<HTMLDivElement>();
  const transition = (i: number) => ({ transition: `all ${DURATION}s ease ${DELAY * i}s` });

  return (
    <main className={"team"} ref={scrollRef}>
      {teamBios.map(({ name, role, image, description }) => (
        <ExecuteOnScroll key={name} className={"bio"}>
          <img src={image.file.url} alt={`${name}, ${role}`} style={transition(0)} />
          <h2 style={transition(1)}>{name}, {role}</h2>
          <DelayEach
            duration={DURATION}
            delay={DELAY}
            startingDelay={DELAY * 2}
            className={"bio-blurb"}
            render={description}
            useP={true}
            asString
          />
        </ExecuteOnScroll>
      ))}
      <ExecuteOnScroll className={"community"}>
        <h2 style={transition(0)}>Our Community</h2>
        <DelayEach
          duration={DURATION}
          delay={DELAY}
          startingDelay={DELAY}
          className={"bio-blurb"}
          useP={true}
          asString
          render={splitByParagraph(data.communityBlurb.body.childMarkdownRemark.html)}
        />
      </ExecuteOnScroll>
    </main>
  )
};

export default Team;

export const query = graphql`
  {
    teamMembers: allContentfulTeamMember(
      filter: { node_locale: { eq: "en-US" } }
      sort: { fields: [index] }
    ) {
      edges {
        node {
          name
          role
          image {
            file {
              url
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    communityBlurb: contentfulTextField(name: { eq: "Team Community Blurb" }) {
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;